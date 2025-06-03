import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { EventSignupController } from './event-signup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signup } from './signup.entity';
import { Field } from 'src/fields/entities/field.entity';
import { FieldsModule } from 'src/fields/fields.module';

import { ResponseModule } from 'src/response/response.module';
import { EventModule } from 'src/event/event.module';
import { Response } from 'src/response/entities/response.entity';
import { JwtService } from '@nestjs/jwt';
import { SignupConsentFormsModule } from 'src/signup-consent-forms/signup-consent-forms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Signup, Field, Response]),
    FieldsModule,
    ResponseModule,
    EventModule,
    SignupConsentFormsModule,
  ],
  controllers: [SignupController, EventSignupController],
  providers: [SignupService, JwtService],
  exports: [SignupService],
})
export class SignupModule {}
