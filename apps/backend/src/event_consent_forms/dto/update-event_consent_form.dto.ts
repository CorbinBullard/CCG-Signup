import { PartialType } from '@nestjs/mapped-types';
import { CreateEventConsentFormDto } from './create-event_consent_form.dto';

export class UpdateEventConsentFormDto extends PartialType(CreateEventConsentFormDto) {}
