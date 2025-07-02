/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { DevicesService } from 'src/devices/devices.service';

@Injectable()
export class IsRegisteredDeviceGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private deviceService: DevicesService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('GET TOKEN PAYLOAD: ', payload);
      // 💡 Extract device ID from payload (assuming it's deviceId)
      const { deviceId } = payload;
      if (!deviceId) {
        throw new UnauthorizedException('Device ID missing in token');
      }

      // 💡 Check the DB for the device
      const device = await this.deviceService.findById(deviceId);
      if (!device || !device.isActive) {
        throw new UnauthorizedException('Device not registered or inactive');
      }

      request['user'] = { deviceId: device.id, deviceName: device.name };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
