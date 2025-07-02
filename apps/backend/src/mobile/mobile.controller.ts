/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Req,
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
  @Post('events/:id/signups/getPayment')
  async getPayment(
    @Param('id') eventId: number,
    @Body() signup: CreateSignupDto,
  ) {
    console.log(eventId, signup);
    return await this.mobileService.getPayment(eventId, signup);
  }

  @UseGuards(IsRegisteredDeviceGuard)
  @Get('events')
  async getEvents() {
    return await this.mobileService.getEvents();
  }

  @UseGuards(IsRegisteredDeviceGuard)
  @Post('events/:id/signups')
  async createSignup(
    @Req() req: Request,
    @Param('id') eventId: number,
    @Body() signup: CreateSignupDto,
  ) {
    const { deviceName }: { deviceName: string } = (req as any).user;
    if (!deviceName) {
      throw new UnauthorizedException('Device Not recognized');
    }
    return await this.mobileService.createSignup(eventId, signup, deviceName);
  }

  @UseGuards(IsRegisteredDeviceGuard)
  @Get('events/:id')
  async getEvent(@Param('id') id: number) {
    return await this.mobileService.getEvent(id);
  }
}
