/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { Repository } from 'typeorm';
import { randomBytes, randomInt, UUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private deviceRepository: Repository<Device>,
  ) {}

  async createDevice(createDeviceDto: CreateDeviceDto) {
    const { name } = createDeviceDto;
    const rawToken = randomInt(0, 1_000_000).toString().padStart(6, '0');

    const hashedToken = await bcrypt.hash(`${rawToken}`, 10);

    const device = this.deviceRepository.create({
      name,
      oneTimeToken: hashedToken,
      isActive: false,
    });

    await this.deviceRepository.save(device);
    return { name, oneTimeToken: rawToken };
  }

  async verifyTokenAndRegister(token: number, uniqueKey: string) {
    const device = await this.deviceRepository.findOne({
      where: { isActive: false },
    });
    console.log('UNIQUE KEY', uniqueKey);
    if (!device || !uniqueKey) throw new UnauthorizedException();
    const match = await bcrypt.compare(token, device.oneTimeToken);

    if (match) {
      const hashedKey = await bcrypt.hash(uniqueKey, 10);
      device.uniqueKey = hashedKey;
      device.isActive = true;
      device.oneTimeToken = undefined;
      return this.deviceRepository.save(device);
    } else {
      throw new UnauthorizedException();
    }
  }

  async findAll() {
    return await this.deviceRepository.find();
  }

  async findById(id: UUID) {
    return await this.deviceRepository.findOne({ where: { id } });
  }

  async update(id: UUID, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.findById(id);
    if (!device) throw new NotFoundException('device not found');
    return await this.deviceRepository.update(id, updateDeviceDto);
  }

  async remove(id: UUID) {
    const device = await this.findById(id);
    if (!device) throw new NotFoundException('device not found');
    return await this.deviceRepository.remove(device);
  }

  async removeInactive() {
    const devices = await this.deviceRepository.find({
      where: { isActive: false },
    });
    return await this.deviceRepository.remove(devices);
  }
  async findByKey(uniqueKey: string) {
    return await this.deviceRepository.findOne({
      where: { uniqueKey },
    });
  }
}
