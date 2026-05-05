import { Test, TestingModule } from '@nestjs/testing';
import { FamilleOlfactivesController } from './familleOlfactives.controller';

describe('FamilleOlfactivesController', () => {
  let controller: FamilleOlfactivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilleOlfactivesController],
    }).compile();

    controller = module.get<FamilleOlfactivesController>(FamilleOlfactivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
