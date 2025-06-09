import { Module } from '@nestjs/common';
import { MobileController } from './mobile.controller';
import { MobileService } from './mobile.service';
import { DevicesModule } from '../devices/devices.module';
import { EventModule } from '../event/event.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    DevicesModule, // So you can inject DevicesService
    EventModule, // So you can inject EventService
  ],
  controllers: [MobileController],
  providers: [MobileService],
  exports: [MobileService], // If other modules need it
})
export class MobileModule {}
