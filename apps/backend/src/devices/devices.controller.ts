import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { IsAdminGuard } from 'src/guards/jwt-auth.guard';
import { UUID } from 'crypto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('register')
  @UseGuards(IsAdminGuard)
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.createDevice(createDeviceDto);
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.devicesService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: UUID, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(id, updateDeviceDto);
  }

  @Delete('inactive')
  removeInactive() {
    console.log('removing inactive');
    return this.devicesService.removeInactive();
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.devicesService.remove(id);
  }
}
