import { Test, TestingModule } from '@nestjs/testing';
import { BodyPartOrmService } from './body-part-orm.service';

describe('BodyPartOrmService', () => {
  let service: BodyPartOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BodyPartOrmService],
    }).compile();

    service = module.get<BodyPartOrmService>(BodyPartOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
