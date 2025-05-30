import { PartialType } from '@nestjs/mapped-types';
import { CreateEventConsentFormDto } from './create-event-consent-form.dto';

export class UpdateEventConsentFormDto extends PartialType(
  CreateEventConsentFormDto,
) {}
