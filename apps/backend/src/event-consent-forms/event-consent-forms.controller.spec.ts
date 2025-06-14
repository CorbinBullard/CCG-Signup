import { Test, TestingModule } from '@nestjs/testing';
import { EventConsentFormsController } from './event-consent-forms.controller';
import { EventConsentFormsService } from './event-consent-forms.service';

describe('EventConsentFormsController', () => {
  let controller: EventConsentFormsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventConsentFormsController],
      providers: [EventConsentFormsService],
    }).compile();

    controller = module.get<EventConsentFormsController>(
      EventConsentFormsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
