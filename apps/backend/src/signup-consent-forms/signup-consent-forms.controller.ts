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
import { CreateSignupConsentFormDto } from './dto/create-signup-consent-form.dto';
import { UpdateSignupConsentFormDto } from './dto/update-signup-consent-form.dto';

@Controller('signup-consent-forms')
export class SignupConsentFormsController {
  constructor(
    private readonly signupConsentFormsService: SignupConsentFormsService,
  ) {}

  @Post()
  create(@Body() createSignupConsentFormDto: CreateSignupConsentFormDto) {
    return this.signupConsentFormsService.create(createSignupConsentFormDto);
  }

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signupConsentFormsService.remove(+id);
  }
}
