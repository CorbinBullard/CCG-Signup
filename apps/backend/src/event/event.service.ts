import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { EventQueryParamsDto } from './dto/event-queryParams.dto';
import { FormTemplateService } from 'src/form-template/form-template.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    private readonly dropboxService: DropboxService,
    private formtemplateService: FormTemplateService,
  ) {}

  async getEvents(query: EventQueryParamsDto): Promise<Event[]> {
    const where: FindOptionsWhere<Event> = {};

    if (query?.title) {
      where.title = ILike(`%${query.title}%`);
    }
    return this.eventRepository.find({ where, order: { date: 'ASC' } });
  }

  async createEvent(
    createEventDto: CreateEventDto,
    image: Express.Multer.File,
  ): Promise<Event> {
    const imageUrl = await this.dropboxService.uploadFile(image);
    const { form } = createEventDto;
    const newEvent = {
      ...createEventDto,
      image: imageUrl,
    };
    if (form.isSaved) {
      await this.formtemplateService.create(form);
    }

    return this.eventRepository.save(newEvent);
  }

  async findOne(id: number): Promise<Event | null> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: { form: { fields: true }, signups: true },
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
      const imageUrl = await this.dropboxService.uploadFile(image);
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
      await this.dropboxService.deleteFile(event.image);
    } else {
      throw new NotFoundException(`Event with id ${id} was not found`);
    }
  }
}
