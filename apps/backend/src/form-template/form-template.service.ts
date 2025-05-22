import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormTemplateDto } from './dto/create-form-template.dto';
import { UpdateFormTemplateDto } from './dto/update-form-template.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FormTemplate } from './entities/form-template.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { FormQueryParamsDto } from 'src/form/dto/form-queryParams.dto';

@Injectable()
export class FormTemplateService {
  constructor(
    @InjectRepository(FormTemplate)
    private formTemplateRepository: Repository<FormTemplate>,
  ) {}

  create(createFormTemplateDto: CreateFormTemplateDto) {
    return this.formTemplateRepository.save(createFormTemplateDto);
  }

  async findAll(query: FormQueryParamsDto): Promise<FormTemplate[]> {
    const where: FindOptionsWhere<FormTemplate> = {};

    if (query?.name) {
      where.name = ILike(`%${query.name}%`);
    }
    return this.formTemplateRepository.find({ where });
  }

  async findOne(id: number): Promise<FormTemplate | null> {
    const form = await this.formTemplateRepository.findOne({
      where: { id },
    });
    if (!form) {
      throw new NotFoundException(`Form with id ${id} not found`);
    }
    return form;
  }

  async update(id: number, updateFormTemplateDto: UpdateFormTemplateDto) {
    await this.findOne(id);
    return await this.formTemplateRepository.save({
      id,
      ...updateFormTemplateDto,
    });
  }

  async remove(id: number) {
    await this.formTemplateRepository.delete(id);
  }
}
