import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventConsentFormDto } from './dto/create-event-consent-form.dto';
import { UpdateEventConsentFormDto } from './dto/update-event-consent-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventConsentForm } from './entities/event-consent-form.entity';
import { Repository } from 'typeorm';
import { Event } from 'src/event/event.entity';
import { ConsentFormsService } from 'src/consent-forms/consent-forms.service';

@Injectable()
export class EventConsentFormsService {
  constructor(
    @InjectRepository(EventConsentForm)
    private ecfRepository: Repository<EventConsentForm>,
    private consentFormService: ConsentFormsService,
  ) {}
  async attachConsentsToEvent(
    event: Event,
    eventConsentFormDtos: CreateEventConsentFormDto[],
  ) {
    console.log(eventConsentFormDtos);

    for (const efcDto of eventConsentFormDtos) {
      const { consentFormId, required } = efcDto;
      console.log('ID: ', consentFormId);
      const efc = await this.consentFormService.findOne(consentFormId);
      console.log('EFC: ', efc);
      if (!efc) {
        console.log('EFC NOT FOUND!!! ');
        throw new NotFoundException(
          `Event Consent Form with id: ${consentFormId} not found`,
        );
      }
      await this.ecfRepository.save({ event, consentForm: efc, required });
    }
    return 'Successfuly added consent forms to event';
  }

  async findAll() {
    return `This action returns all eventConsentForms`;
  }

  async findOne(id: number) {
    return await this.ecfRepository.findOne({ where: { id } });
  }

  update(id: number, updateEventConsentFormDto: UpdateEventConsentFormDto) {
    return `This action updates a #${id} eventConsentForm`;
  }

  async remove(id: number) {
    return await this.ecfRepository.delete(id);
  }

  async clearEventConsentForms(event: Event) {
    return await this.ecfRepository.delete({ event });
  }
}
