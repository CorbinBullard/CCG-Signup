import { PartialType } from '@nestjs/mapped-types';
import { CreateConsentFormDto } from './create-consent-form.dto';

export class UpdateConsentFormDto extends PartialType(CreateConsentFormDto) {}
