import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { FormModule } from '../form/form.module';
import { Form } from 'src/form/form.entity';

import { FormService } from 'src/form/form.service';
import { FieldsService } from 'src/fields/fields.service';
import { Field } from 'src/fields/entities/field.entity';
import { JwtService } from '@nestjs/jwt';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { FormTemplateModule } from 'src/form-template/form-template.module';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { EventConsentFormsModule } from 'src/event-consent-forms/event-consent-forms.module';
import { EventCleanupServiceService } from 'src/event-cleanup-service/event-cleanup-service.service';
import { FieldsModule } from 'src/fields/fields.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Form, Field]),
    FormModule,
    FormTemplateModule,
    EventConsentFormsModule,
    FieldsModule,
  ],
  providers: [
    EventService,
    FormService,
    FieldsService,
    JwtService,
    DropboxService,
    AwsS3Service,
    EventCleanupServiceService,
  ],
  controllers: [EventController],
  exports: [EventService, EventCleanupServiceService],
})
export class EventModule {}
