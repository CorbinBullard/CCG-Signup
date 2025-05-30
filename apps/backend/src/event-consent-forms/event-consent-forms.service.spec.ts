import { Test, TestingModule } from '@nestjs/testing';
import { EventConsentFormsService } from './event-consent-forms.service';

describe('EventConsentFormsService', () => {
  let service: EventConsentFormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventConsentFormsService],
    }).compile();

    service = module.get<EventConsentFormsService>(EventConsentFormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
