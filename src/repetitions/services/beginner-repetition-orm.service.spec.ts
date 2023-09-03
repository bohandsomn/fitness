import { Test, TestingModule } from '@nestjs/testing';
import { BeginnerRepetitionOrmService } from './beginner-repetition-orm.service';

describe('BeginnerRepetitionOrmService', () => {
  let service: BeginnerRepetitionOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeginnerRepetitionOrmService],
    }).compile();

    service = module.get<BeginnerRepetitionOrmService>(BeginnerRepetitionOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
