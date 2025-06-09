import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { JwtService } from '@nestjs/jwt';
import { DeviceGateway } from './device.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  controllers: [DevicesController],
  providers: [DevicesService, JwtService, DeviceGateway],
  exports: [DevicesService],
})
export class DevicesModule {}
