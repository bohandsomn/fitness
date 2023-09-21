import { Test, TestingModule } from '@nestjs/testing';
import { UserOrmService } from './user-orm.service.js';

describe('UserOrmService', () => {
  let service: UserOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOrmService],
    }).compile();

    service = module.get<UserOrmService>(UserOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
