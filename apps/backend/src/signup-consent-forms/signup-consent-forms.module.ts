import { Module } from '@nestjs/common';
import { SignupConsentFormsService } from './signup-consent-forms.service';
import { SignupConsentFormsController } from './signup-consent-forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignupConsentForm } from './entities/signup-consent-form.entity';
import { SignupModule } from 'src/signup/signup.module';
import { EventConsentFormsModule } from 'src/event-consent-forms/event-consent-forms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SignupConsentForm]),
    EventConsentFormsModule,
  ],
  controllers: [SignupConsentFormsController],
  providers: [SignupConsentFormsService],
  exports: [SignupConsentFormsService],
})
export class SignupConsentFormsModule {}
