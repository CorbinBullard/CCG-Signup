import { Test, TestingModule } from '@nestjs/testing';
import { ConsentFormsService } from './consent_forms.service';

describe('ConsentFormsService', () => {
  let service: ConsentFormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsentFormsService],
    }).compile();

    service = module.get<ConsentFormsService>(ConsentFormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
