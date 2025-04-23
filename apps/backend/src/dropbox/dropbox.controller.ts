import { Controller, Get, Query, Res } from '@nestjs/common';
import { DropboxService } from './dropbox.service';
import { Response } from 'express';

@Controller('dropbox')
export class DropboxController {
  constructor(private readonly dropboxService: DropboxService) {}

  @Get()
  getHello() {
    return 'Hello from Dropbox!';
  }

  @Get('auth')
  authRedirect(@Res() res: Response) {
    const url = this.dropboxService.getAuthUrl();
    res.redirect(url);
  }

  @Get('callback')
  async handleCallback(@Query('code') code: string, @Res() res: Response) {
    await this.dropboxService.handleCallback(code);
    res.send('Dropbox connected successfully!');
  }
}
