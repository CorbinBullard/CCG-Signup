import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { FormModule } from '../form/form.module';
import { Form } from 'src/form/form.entity';
import { Field } from 'src/field/field.entity';
import { FormService } from 'src/form/form.service';
import { FieldService } from 'src/field/field.service';
@Module({
  imports: [TypeOrmModule.forFeature([Event, Form, Field]), FormModule],
  providers: [EventService, FormService, FieldService],
  controllers: [EventController],
})
export class EventModule {}
