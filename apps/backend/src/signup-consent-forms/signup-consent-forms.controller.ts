import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SignupConsentFormsService } from './signup-consent-forms.service';
import { UpdateSignupConsentFormDto } from './dto/update-signup-consent-form.dto';

@Controller('signup-consent-forms')
export class SignupConsentFormsController {
  constructor(
    private readonly signupConsentFormsService: SignupConsentFormsService,
  ) {}

  @Get()
  findAll() {
    return this.signupConsentFormsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signupConsentFormsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSignupConsentFormDto: UpdateSignupConsentFormDto,
  ) {
    return this.signupConsentFormsService.update(
      +id,
      updateSignupConsentFormDto,
    );
  }
}
