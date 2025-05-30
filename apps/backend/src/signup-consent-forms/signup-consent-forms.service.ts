import { Injectable } from '@nestjs/common';
import { CreateSignupConsentFormDto } from './dto/create-signup-consent-form.dto';
import { UpdateSignupConsentFormDto } from './dto/update-signup-consent-form.dto';

@Injectable()
export class SignupConsentFormsService {
  create(createSignupConsentFormDto: CreateSignupConsentFormDto) {
    return 'This action adds a new signupConsentForm';
  }

  findAll() {
    return `This action returns all signupConsentForms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signupConsentForm`;
  }

  update(id: number, updateSignupConsentFormDto: UpdateSignupConsentFormDto) {
    return `This action updates a #${id} signupConsentForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} signupConsentForm`;
  }
}
