import { Test, TestingModule } from '@nestjs/testing';
import { CharacteristicBodyPartsService } from './characteristic-body-parts.service';

describe('CharacteristicBodyPartsService', () => {
  let service: CharacteristicBodyPartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacteristicBodyPartsService],
    }).compile();

    service = module.get<CharacteristicBodyPartsService>(CharacteristicBodyPartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
