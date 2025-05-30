import { Test, TestingModule } from '@nestjs/testing';
import { SignupConsentFormsController } from './signup-consent-forms.controller';
import { SignupConsentFormsService } from './signup-consent-forms.service';

describe('SignupConsentFormsController', () => {
  let controller: SignupConsentFormsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignupConsentFormsController],
      providers: [SignupConsentFormsService],
    }).compile();

    controller = module.get<SignupConsentFormsController>(SignupConsentFormsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
