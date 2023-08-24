import { Test, TestingModule } from '@nestjs/testing';
import { BodyPartController } from './body-part.controller';

describe('BodyPartController', () => {
  let controller: BodyPartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BodyPartController],
    }).compile();

    controller = module.get<BodyPartController>(BodyPartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
