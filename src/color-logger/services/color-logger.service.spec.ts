import { Test, TestingModule } from '@nestjs/testing';
import { ColorLoggerService } from './color-logger.service.js';

describe('ColorLoggerService', () => {
  let service: ColorLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColorLoggerService],
    }).compile();

    service = module.get<ColorLoggerService>(ColorLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
