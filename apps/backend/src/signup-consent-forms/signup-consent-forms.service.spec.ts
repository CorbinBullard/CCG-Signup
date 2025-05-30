import { Test, TestingModule } from '@nestjs/testing';
import { SignupConsentFormsService } from './signup-consent-forms.service';

describe('SignupConsentFormsService', () => {
  let service: SignupConsentFormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignupConsentFormsService],
    }).compile();

    service = module.get<SignupConsentFormsService>(SignupConsentFormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
