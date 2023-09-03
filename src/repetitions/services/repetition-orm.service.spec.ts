import { Test, TestingModule } from '@nestjs/testing';
import { RepetitionOrmService } from './repetition-orm.service';

describe('RepetitionOrmService', () => {
  let service: RepetitionOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepetitionOrmService],
    }).compile();

    service = module.get<RepetitionOrmService>(RepetitionOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
