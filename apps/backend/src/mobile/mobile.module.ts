import { Module } from '@nestjs/common';
import { MobileController } from './mobile.controller';
import { MobileService } from './mobile.service';
import { DevicesModule } from '../devices/devices.module';
import { EventModule } from '../event/event.module';
import { JwtModule } from '@nestjs/jwt';
import { SignupModule } from 'src/signup/signup.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
    DevicesModule, // So you can inject DevicesService
    EventModule, // So you can inject EventService
    SignupModule,
  ],
  controllers: [MobileController],
  providers: [MobileService],
  exports: [MobileService], // If other modules need it
})
export class MobileModule {}
