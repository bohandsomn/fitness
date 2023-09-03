import { Test, TestingModule } from '@nestjs/testing';
import { CharacteristicOrmService } from './characteristic-orm.service';

describe('CharacteristicOrmService', () => {
  let service: CharacteristicOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacteristicOrmService],
    }).compile();

    service = module.get<CharacteristicOrmService>(CharacteristicOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
