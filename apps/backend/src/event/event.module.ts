import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { FormModule } from '../form/form.module';
import { Form } from 'src/form/form.entity';

import { FormService } from 'src/form/form.service';
import { FieldsService } from 'src/fields/fields.service';
import { Field } from 'src/fields/entities/field.entity';
import { JwtService } from '@nestjs/jwt';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { FormTemplateService } from 'src/form-template/form-template.service';
import { FormTemplateModule } from 'src/form-template/form-template.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Form, Field]),
    FormModule,
    FormTemplateModule,
  ],
  providers: [
    EventService,
    FormService,
    FieldsService,
    JwtService,
    DropboxService,
  ],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
