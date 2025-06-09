/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DevicesService } from 'src/devices/devices.service';
import * as bcrypt from 'bcrypt';
import { EventService } from 'src/event/event.service';
@Injectable()
export class MobileService {
  constructor(
    private jwtService: JwtService,
    private deviceService: DevicesService,
    private eventsService: EventService,
  ) {}

  async getToken(token: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('Payload: ', payload);
      // Extract deviceId from payload
      const { deviceId } = payload;
      if (!deviceId) {
        throw new UnauthorizedException('Device ID missing from token');
      }

      // Check if device exists and is active
      const device = await this.deviceService.findById(deviceId);
      if (!device || !device.isActive) {
        throw new UnauthorizedException('Device not registered or inactive');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async signIn({ id, uniqueKey }) {
    console.log('ID + KEY', id, uniqueKey);
    if (!id || !uniqueKey) {
      throw new UnauthorizedException();
    }
    const device = await this.deviceService.findById(id);
    console.log(device);
    if (!device) {
      throw new UnauthorizedException();
    }
    const isValidKey: boolean = await bcrypt.compare(
      uniqueKey,
      device.uniqueKey,
    );
    if (!isValidKey) throw new UnauthorizedException();

    const access_token = await this.jwtService.signAsync({
      deviceId: id,
    });
    return { access_token }; // Generate JWT
  }

  async getEvents() {
    return await this.eventsService.getEventsForMobile();
  }

  async getEvent(id: number) {
    return await this.eventsService.findOneEventForMobile(id);
  }
}
