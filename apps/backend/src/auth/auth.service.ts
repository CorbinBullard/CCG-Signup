/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  private adminEmail = process.env.ADMIN_EMAIL;
  private adminPassword = process.env.ADMIN_PASSWORD;

  constructor(private jwtService: JwtService) {}

  async getToken(token: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log(payload);
      // Ensure the token is for the admin only!
      if (payload.email !== this.adminEmail) {
        return false;
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async signIn({ email, password }: CreateAuthDto) {
    if (email !== this.adminEmail) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      this.adminPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = await this.jwtService.signAsync({ email });
    return { access_token }; // Generate JWT
  }
}
