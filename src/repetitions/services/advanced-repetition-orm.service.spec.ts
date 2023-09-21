import { Test, TestingModule } from '@nestjs/testing';
import { AdvancedRepetitionOrmService } from './advanced-repetition-orm.service.js';

describe('AdvancedRepetitionOrmService', () => {
  let service: AdvancedRepetitionOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvancedRepetitionOrmService],
    }).compile();

    service = module.get<AdvancedRepetitionOrmService>(AdvancedRepetitionOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
