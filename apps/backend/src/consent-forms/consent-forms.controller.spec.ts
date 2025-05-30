import { Test, TestingModule } from '@nestjs/testing';
import { ConsentFormsController } from './consent-forms.controller';
import { ConsentFormsService } from './consent-forms.service';

describe('ConsentFormsController', () => {
  let controller: ConsentFormsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsentFormsController],
      providers: [ConsentFormsService],
    }).compile();

    controller = module.get<ConsentFormsController>(ConsentFormsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
