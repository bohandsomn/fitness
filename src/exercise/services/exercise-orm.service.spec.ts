import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseOrmService } from './exercise-orm.service';

describe('ExerciseOrmService', () => {
  let service: ExerciseOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseOrmService],
    }).compile();

    service = module.get<ExerciseOrmService>(ExerciseOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
