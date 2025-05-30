import { Module } from '@nestjs/common';
import { EventConsentFormsService } from './event_consent_forms.service';
import { EventConsentFormsController } from './event_consent_forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventConsentForm } from './entities/event_consent_form.entity';
import { ConsentFormsModule } from 'src/consent_forms/consent_forms.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventConsentForm]), ConsentFormsModule],
  controllers: [EventConsentFormsController],
  providers: [EventConsentFormsService],
  exports: [EventConsentFormsService],
})
export class EventConsentFormsModule {}
