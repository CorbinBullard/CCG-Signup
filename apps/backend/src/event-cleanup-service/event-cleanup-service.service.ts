import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/event/entities/event.entity';
import { EventService } from 'src/event/event.service';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class EventCleanupServiceService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private eventService: EventService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deactivateEvents() {
    const now = new Date();
    const pastEvents: Event[] | null = await this.eventRepository.find({
      where: { isActive: true, date: LessThan(now) },
    });
    if (pastEvents && pastEvents?.length) {
      for (const event of pastEvents) {
        await this.eventService.updateEventStatus(event.id, false);
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteEvents() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    await this.eventRepository.delete({
      date: LessThan(oneWeekAgo),
    });
  }
}
