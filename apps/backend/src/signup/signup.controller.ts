import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Post,
} from '@nestjs/common';
import { SignupService } from './signup.service';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { IsAdminGuard } from 'src/guards/jwt-auth.guard';
import { CreateSignupConsentFormDto } from 'src/signup-consent-forms/dto/create-signup-consent-form.dto';
import { SignupConsentFormsService } from 'src/signup-consent-forms/signup-consent-forms.service';

@UseGuards(IsAdminGuard)
@Controller('signups')
export class SignupController {
  constructor(
    private readonly signupService: SignupService,
    private scfService: SignupConsentFormsService,
  ) {}

  @Get()
  findAll() {
    return this.signupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signupService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSignupDto: any) {
    console.log('updateSignupDto', updateSignupDto);
    return this.signupService.update(+id, updateSignupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signupService.remove(+id);
  }

  @Post(':id/consent-forms')
  createSCFs(
    @Param('id') id: number,
    @Body() createSCFDtos: CreateSignupConsentFormDto[],
  ) {
    this.signupService.attachSignupConsentForms(id, createSCFDtos);
  }
}
