import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventQueryParamsDto } from './dto/event-queryParams.dto';
import { FormTemplateService } from 'src/form-template/form-template.service';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { EventConsentFormsService } from 'src/event-consent-forms/event-consent-forms.service';
import { CreateEventConsentFormDto } from 'src/event-consent-forms/dto/create-event-consent-form.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    private readonly awsService: AwsS3Service,
    private formtemplateService: FormTemplateService,
    private efcService: EventConsentFormsService,
  ) {}

  async getEvents(query: EventQueryParamsDto): Promise<Event[]> {
    const where: FindOptionsWhere<Event> = {};

    if (query?.title) {
      where.title = ILike(`%${query.title}%`);
    }
    return this.eventRepository.find({
      where,
      order: { date: 'ASC' },
    });
  }

  async createEvent(
    createEventDto: CreateEventDto,
    image: Express.Multer.File,
  ): Promise<Event> {
    const imageUrl = await this.awsService.uploadFile(image);
    const { form } = createEventDto;
    const newEvent = {
      ...createEventDto,
      image: imageUrl,
    };
    if (form.isSaved) {
      await this.formtemplateService.create(form);
    }

    const event: Event = await this.eventRepository.save(newEvent);
    console.log('EVENT: ', event);
    const eventConsentForms = event.eventConsentForms;
    if (eventConsentForms && eventConsentForms.length)
      await this.efcService.attachConsentsToEvent(event, eventConsentForms);
    return event;
  }

  async findOne(id: number): Promise<Event | null> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: {
        form: { fields: true },
        signups: true,
        eventConsentForms: true,
      },
    });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  async updateEvent(
    id: number,
    updateEventDto: UpdateEventDto,
    image?: Express.Multer.File,
  ): Promise<Event | null> {
    await this.findOne(id);

    if (image) {
      const imageUrl = await this.awsService.uploadFile(image);
      updateEventDto.image = imageUrl;
    }
    await this.eventRepository.update(id, updateEventDto);
    return await this.findOne(id);
  }

  async deleteEvent(id: number): Promise<void> {
    const event = await this.findOne(id);
    console.log(event?.image);
    if (event) {
      await this.eventRepository.delete(id);
      await this.awsService.deleteFileByUrl(event.image);
    } else {
      throw new NotFoundException(`Event with id ${id} was not found`);
    }
  }

  async updateEventConsentForms(
    eventId: number,
    ecfArray: CreateEventConsentFormDto[],
  ) {
    const event = await this.findOne(eventId);
    if (!event)
      throw new NotFoundException(`Event with id ${eventId} was not found`);
    await this.efcService.clearEventConsentForms(event);

    console.log('ecfArray: ', ecfArray);
    if (!ecfArray || !ecfArray.length) return this.findOne(eventId);
    await this.efcService.attachConsentsToEvent(event, ecfArray);
    return this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['eventConsentForms', 'eventConsentForms.consentForm'],
    });
  }
}
