import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmService } from './type-orm.service';

describe('TypeOrmService', () => {
  let service: TypeOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeOrmService],
    }).compile();

    service = module.get<TypeOrmService>(TypeOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
