import { PartialType } from '@nestjs/mapped-types';
import { CreateSignupConsentFormDto } from './create-signup-consent-form.dto';

export class UpdateSignupConsentFormDto extends PartialType(CreateSignupConsentFormDto) {}
