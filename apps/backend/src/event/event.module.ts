import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { FormModule } from '../form/form.module';
@Module({
  imports: [TypeOrmModule.forFeature([Event]), FormModule],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
