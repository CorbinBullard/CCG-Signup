/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DevicesService } from 'src/devices/devices.service';
import * as bcrypt from 'bcrypt';
import { EventService } from 'src/event/event.service';
import { CreateSignupDto } from 'src/signup/dto/create-signup.dto';
import { getEventCost } from 'utils/Checkout/CostCalculator';
import { SignupService } from 'src/signup/signup.service';
@Injectable()
export class MobileService {
  constructor(
    private jwtService: JwtService,
    private deviceService: DevicesService,
    private eventsService: EventService,
    private signupService: SignupService,
  ) {}

  async getToken(token: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
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

  async getPayment(eventId: number, signup: CreateSignupDto) {
    const event = await this.getEvent(eventId);
    if (!event) throw new NotFoundException('Event not found');
    const cost: number = getEventCost(event, signup);
    return cost;
  }

  async createSignup(
    eventId: number,
    signup: CreateSignupDto,
    deviceName: string,
  ) {
    const newSignup = await this.signupService.create(signup, eventId);
    const { signupConsentForms } = signup;
    console.log('SCForms: ', signupConsentForms);

    if (signupConsentForms && signupConsentForms.length) {
      await this.signupService.attachSignupConsentForms(
        newSignup.id,
        signupConsentForms.map((scf) => ({ ...scf, deviceName })),
      );
    }
    return newSignup;
  }
}
