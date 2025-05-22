import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';
import { FormTemplateService } from 'src/form-template/form-template.service';
import { CreateFormTemplateDto } from 'src/form-template/dto/create-form-template.dto';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) private formRepository: Repository<Form>,
    private formTemplateService: FormTemplateService,
  ) {}

  async find(): Promise<Form[]> {
    return this.formRepository.find();
  }

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
    if (updateFormDto.isSaved) {
      const { name, fields } = updateFormDto;
      const formTemplateDto: CreateFormTemplateDto = {
        name: name ?? 'Untitled',
        fields: fields ?? [],
      };
      await this.formTemplateService.create(formTemplateDto);
    }
    return await this.formRepository.save({ id, ...updateFormDto });
  }

  async createForm(createFormDto: CreateFormDto) {
    return await this.formRepository.save(createFormDto);
  }
}
