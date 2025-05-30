import { Module } from '@nestjs/common';
import { SignupConsentFormsService } from './signup-consent-forms.service';
import { SignupConsentFormsController } from './signup-consent-forms.controller';

@Module({
  controllers: [SignupConsentFormsController],
  providers: [SignupConsentFormsService],
})
export class SignupConsentFormsModule {}
