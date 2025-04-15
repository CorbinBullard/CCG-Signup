// src/dropbox/dropbox.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DropboxService {
  private accessToken = process.env.DROPBOX_ACCESS_TOKEN;

  async uploadFile(
    file: Express.Multer.File,
    folder = '/event-images',
  ): Promise<string> {
    const dropboxPath = `${folder}/${Date.now()}-${file.originalname}`;

    try {
      // Step 1: Upload the file to Dropbox
      await axios.post(
        'https://content.dropboxapi.com/2/files/upload',
        file.buffer,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
              path: dropboxPath,
              mode: 'add',
              autorename: true,
              mute: false,
              strict_conflict: false,
            }),
          },
        },
      );

      // Step 2: Create a shared public link
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // Convert to direct raw URL
      return convertDropboxToDirect(data.url);
    } catch (error) {
      console.error('Dropbox upload error:', error.response?.data || error);
      throw new InternalServerErrorException('Failed to upload to Dropbox');
    }
  }
}

function convertDropboxToDirect(url: string): string {
  return url.replace(/dl=0$/, 'raw=1').replace(/dl=1$/, 'raw=1');
}
