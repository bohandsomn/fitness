import { Test, TestingModule } from '@nestjs/testing';
import { SetOrmService } from './set-orm.service.js';

describe('SetOrmService', () => {
  let service: SetOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetOrmService],
    }).compile();

    service = module.get<SetOrmService>(SetOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
