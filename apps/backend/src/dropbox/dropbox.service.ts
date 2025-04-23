import { InternalServerErrorException } from '@nestjs/common';
import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DropboxService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private refreshToken?: string;
  private accessToken?: string;
  private tokenExpiresAt?: number;

  constructor() {
    if (
      !process.env.DROPBOX_CLIENT_ID ||
      !process.env.DROPBOX_CLIENT_SECRET ||
      !process.env.DROPBOX_REDIRECT_URI
    ) {
      throw new Error('Dropbox environment variables must be set.');
    }

    this.clientId = process.env.DROPBOX_CLIENT_ID;
    this.clientSecret = process.env.DROPBOX_CLIENT_SECRET;
    this.refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
    this.redirectUri = process.env.DROPBOX_REDIRECT_URI;

    console.log(
      this.clientId,
      this.clientSecret,
      this.redirectUri,
      this.refreshToken,
    );
  }

  getAuthUrl() {
    const scope = 'files.content.read files.content.write';
    return `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&token_access_type=offline&scope=${scope}`;
  }

  async handleCallback(code: string) {
    const response = await axios.post(
      'https://api.dropboxapi.com/oauth2/token',
      new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    this.accessToken = response.data.access_token;

    this.refreshToken = response.data.refresh_token;

    // Token expires after ~4 hours (Dropbox default is 14400 seconds)
    this.tokenExpiresAt = Date.now() + response.data.expires_in * 1000;

    console.log('Access Token:', this.accessToken);
    console.log('Refresh Token:', this.refreshToken);
  }

  private async refreshAccessToken() {
    if (!this.refreshToken)
      throw new HttpException('No refresh token stored', 400);

    const response = await axios.post(
      'https://api.dropboxapi.com/oauth2/token',
      new URLSearchParams({
        refresh_token: this.refreshToken,
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    this.accessToken = response.data.access_token;
    // Update expiry
    this.tokenExpiresAt = Date.now() + response.data.expires_in * 1000;

    return this.accessToken;
  }

  private async getValidAccessToken(): Promise<string> {
    if (
      !this.accessToken ||
      !this.tokenExpiresAt ||
      Date.now() >= this.tokenExpiresAt
    ) {
      await this.refreshAccessToken();
    }
    return this.accessToken!;
  }

  async uploadFile(
    file: Express.Multer.File,
    folder = '/event-images',
  ): Promise<string> {
    const dropboxPath = `${folder}/${Date.now()}-${file.originalname}`;

    try {
      const token = await this.getValidAccessToken();

      await axios.post(
        'https://content.dropboxapi.com/2/files/upload',
        file.buffer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
              path: dropboxPath,
              mode: 'add',
              autorename: true,
              mute: false,
            }),
          },
        },
      );

      const { data } = await axios.post(
        'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
        {
          path: dropboxPath,
          settings: {
            requested_visibility: 'public',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return convertDropboxToDirect(data.url);
    } catch (error) {
      console.error('Dropbox upload error:', error.response?.data || error);

      if (error.response?.status === 401) {
        await this.refreshAccessToken();
        throw new InternalServerErrorException(
          'Retry upload after token refresh.',
        );
      }

      throw new InternalServerErrorException('Failed to upload to Dropbox');
    }
  }
}

function convertDropboxToDirect(url: string): string {
  return url.replace(/dl=0$/, 'raw=1').replace(/dl=1$/, 'raw=1');
}
