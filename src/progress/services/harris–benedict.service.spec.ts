import { Test, TestingModule } from '@nestjs/testing';
import { HarrisBenedictService } from './harris–benedict.service';

describe('HarrisBenedictService', () => {
  let service: HarrisBenedictService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HarrisBenedictService],
    }).compile();

    service = module.get<HarrisBenedictService>(HarrisBenedictService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
