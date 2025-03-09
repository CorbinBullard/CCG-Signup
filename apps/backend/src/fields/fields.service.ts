import { Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Field) private fieldRepository: Repository<Field>,
  ) {}

  async findOne(id: number) {
    return await this.fieldRepository.findOne({ where: { id } });
  }
}
