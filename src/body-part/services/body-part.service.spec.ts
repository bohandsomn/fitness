import { Test, TestingModule } from '@nestjs/testing';
import { BodyPartService } from './body-part.service';

describe('BodyPartService', () => {
  let service: BodyPartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BodyPartService],
    }).compile();

    service = module.get<BodyPartService>(BodyPartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
