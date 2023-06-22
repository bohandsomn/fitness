import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseService } from './exercise.service';
import { OrmModule } from '../orm/orm.module';
import { ExerciseController } from './exercise.controller';

describe('ExerciseService', () => {
  let service: ExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrmModule],
      controllers: [ExerciseController],
      providers: [ExerciseService]
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
