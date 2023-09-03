import { Test, TestingModule } from '@nestjs/testing';
import { IntermediateRepetitionOrmService } from './intermediate-repetition-orm.service';

describe('IntermediateRepetitionOrmService', () => {
  let service: IntermediateRepetitionOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntermediateRepetitionOrmService],
    }).compile();

    service = module.get<IntermediateRepetitionOrmService>(IntermediateRepetitionOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
