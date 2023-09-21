import { Test, TestingModule } from '@nestjs/testing';
import { HistoryOrmService } from './history-orm.service.js';

describe('HistoryOrmService', () => {
  let service: HistoryOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryOrmService],
    }).compile();

    service = module.get<HistoryOrmService>(HistoryOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
