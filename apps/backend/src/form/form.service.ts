import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) private formRepository: Repository<Form>,
  ) {}

  async findOne(id: number): Promise<Form | null> {
    const form = await this.formRepository.findOne({
      where: { id },
      relations: { fields: true },
    });
    if (!form) {
      throw new NotFoundException(`Form with id ${id} not found`);
    }
    return form;
  }

  async updateForm(id: number, updateFormDto: Partial<CreateFormDto>) {
    await this.findOne(id);
    return await this.formRepository.save({ id, ...updateFormDto });
  }
}
