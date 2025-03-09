import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { FormModule } from '../form/form.module';
import { Form } from 'src/form/form.entity';

import { FormService } from 'src/form/form.service';

import { IsValidResponse } from 'src/response/validation/isValidResponse';
import { FieldsService } from 'src/fields/fields.service';
import { Field } from 'src/fields/entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Form, Field]), FormModule],
  providers: [EventService, FormService, IsValidResponse, FieldsService],
  controllers: [EventController],
})
export class EventModule {}
