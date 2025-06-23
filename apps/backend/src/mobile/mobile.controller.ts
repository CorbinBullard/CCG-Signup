import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { IsRegisteredDeviceGuard } from 'src/guards/jwt-device.guard';
import { MobileService } from './mobile.service';
import { CreateSignupDto } from 'src/signup/dto/create-signup.dto';

@Controller('mobile')
export class MobileController {
  constructor(private readonly mobileService: MobileService) {}

  @Get('auth')
  async getToken(@Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized');
    }
    const token: string = authHeader.split(' ')[1];
    return await this.mobileService.getToken(token);
  }

  @Post('auth')
  async loginDevice(@Body() { id, uniqueKey }) {
    return await this.mobileService.signIn({ id, uniqueKey });
  }

  @UseGuards(IsRegisteredDeviceGuard)
  @Get()
  test() {
    console.log('TEST SUCESS');
  }

  @UseGuards(IsRegisteredDeviceGuard)
  @Get('events')
  async getEvents() {
    return await this.mobileService.getEvents();
  }

  @Post('events/:id/signups')
  createSignup(@Param('id') eventId: number, @Body() signup: CreateSignupDto) {
    console.log('SIGNUP ', signup);
  }

  @Get('events/:id')
  async getEvent(@Param('id') id: number) {
    return await this.mobileService.getEvent(id);
  }
}
