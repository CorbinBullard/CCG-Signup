import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsentFormDto } from './dto/create-consent_form.dto';
import { UpdateConsentFormDto } from './dto/update-consent_form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsentForm } from './entities/consent_form.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ConsentFormQueryParamsDto } from './dto/consent_form-query-params.dto';

@Injectable()
export class ConsentFormsService {
  constructor(
    @InjectRepository(ConsentForm)
    private consentRepository: Repository<ConsentForm>,
  ) {}

  async create(createConsentFormDto: CreateConsentFormDto) {
    return await this.consentRepository.save(createConsentFormDto);
  }

  async findAll(query: ConsentFormQueryParamsDto): Promise<ConsentForm[]> {
    const where: FindOptionsWhere<ConsentForm> = {};

    if (query?.name) {
      where.name = ILike(`%${query.name}%`);
    }

    return await this.consentRepository.find({ where });
  }

  async findOne(id: number) {
    const consentForm = await this.consentRepository.findOne({ where: { id } });
    if (!consentForm)
      throw new NotFoundException(`Consent Form with id ${id} not found`);
    return consentForm;
  }

  async update(id: number, updateConsentFormDto: UpdateConsentFormDto) {
    await this.findOne(id);
    return await this.consentRepository.save({ id, ...updateConsentFormDto });
  }

  async remove(id: number) {
    return await this.consentRepository.delete(id);
  }
}
