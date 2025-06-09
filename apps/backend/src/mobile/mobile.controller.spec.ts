import { Test, TestingModule } from '@nestjs/testing';
import { MobileController } from './mobile.controller';

describe('MobileController', () => {
  let controller: MobileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MobileController],
    }).compile();

    controller = module.get<MobileController>(MobileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
