import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSignupConsentFormDto } from './dto/create-signup-consent-form.dto';
import { UpdateSignupConsentFormDto } from './dto/update-signup-consent-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupConsentForm } from './entities/signup-consent-form.entity';
import { Repository } from 'typeorm';
import { Signup } from 'src/signup/signup.entity';
import { SignupService } from 'src/signup/signup.service';
import { Event } from 'src/event/event.entity';
import { EventConsentFormsService } from 'src/event-consent-forms/event-consent-forms.service';
import { EventConsentForm } from 'src/event-consent-forms/entities/event-consent-form.entity';

@Injectable()
export class SignupConsentFormsService {
  constructor(
    @InjectRepository(SignupConsentForm)
    private scfRespository: Repository<SignupConsentForm>,
    private ecfService: EventConsentFormsService,
  ) {}
  async create(
    signup: Signup,
    createSignupConsentFormDto: CreateSignupConsentFormDto,
  ) {
    // console.log(createSignupConsentFormDto);
    const { eventConsentFormId } = createSignupConsentFormDto;

    const ecf: EventConsentForm | null =
      await this.ecfService.findOne(eventConsentFormId);

    if (!ecf)
      throw new NotFoundException(
        `Event Consent Form with id ${eventConsentFormId} not found`,
      );

    const scf = this.scfRespository.create({
      ...createSignupConsentFormDto,
      signup,
      eventConsentForm: ecf,
    });

    const newSCF = await this.scfRespository.save(scf);
    console.log('new SCF: ', newSCF);
    return newSCF;
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

  async removeBySignup(signup: Signup) {
    await this.scfRespository.delete({ signupId: signup.id });
    const leftovers = await this.scfRespository.find({
      where: { signupId: signup.id },
    });
    return leftovers;
  }
  async clear() {
    return await this.scfRespository.clear();
  }
}
