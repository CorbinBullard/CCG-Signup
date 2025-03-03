import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository } from 'typeorm';

import { CreateEventDto } from './dto/create-event.dto';
import { FormService } from 'src/form/form.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    private formService: FormService,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    return this.eventRepository.save(createEventDto);
  }

  async getEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event | null> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: { form: { fields: true } },
    });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }
  async deleteAllEvents(): Promise<void> {
    await this.eventRepository.clear();
  }
}
