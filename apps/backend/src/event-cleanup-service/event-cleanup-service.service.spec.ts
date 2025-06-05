import { Test, TestingModule } from '@nestjs/testing';
import { EventCleanupServiceService } from './event-cleanup-service.service';

describe('EventCleanupServiceService', () => {
  let service: EventCleanupServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventCleanupServiceService],
    }).compile();

    service = module.get<EventCleanupServiceService>(EventCleanupServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
