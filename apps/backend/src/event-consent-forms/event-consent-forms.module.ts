import { Module } from '@nestjs/common';
import { EventConsentFormsService } from './event-consent-forms.service';
import { EventConsentFormsController } from './event-consent-forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventConsentForm } from './entities/event-consent-form.entity';
import { ConsentFormsModule } from 'src/consent-forms/consent-forms.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventConsentForm]), ConsentFormsModule],
  controllers: [EventConsentFormsController],
  providers: [EventConsentFormsService],
  exports: [EventConsentFormsService],
})
export class EventConsentFormsModule {}
