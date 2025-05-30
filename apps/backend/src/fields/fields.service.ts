import { Injectable } from '@nestjs/common';
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

  async deleteFields(fields: Field[]) {
    return await this.fieldRepository.remove(fields);
  }
}
