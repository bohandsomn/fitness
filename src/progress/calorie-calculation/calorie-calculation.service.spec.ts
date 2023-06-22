import { Test, TestingModule } from '@nestjs/testing';
import { CalorieCalculationService } from './calorie-calculation.service';

describe('CalorieCalculationService', () => {
  let service: CalorieCalculationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalorieCalculationService],
    }).compile();

    service = module.get<CalorieCalculationService>(CalorieCalculationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
