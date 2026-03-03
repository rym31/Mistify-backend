import { Test, TestingModule } from '@nestjs/testing';
import { ParfumsController } from './parfums.controller';

describe('ParfumsController', () => {
  let controller: ParfumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParfumsController],
    }).compile();

    controller = module.get<ParfumsController>(ParfumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
