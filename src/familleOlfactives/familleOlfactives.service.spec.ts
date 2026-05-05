import { Test, TestingModule } from '@nestjs/testing';
import { FamilleOlfactivesService } from './familleOlfactives.service';

describe('FamilleOlfactivesService', () => {
  let service: FamilleOlfactivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilleOlfactivesService],
    }).compile();

    service = module.get<FamilleOlfactivesService>(FamilleOlfactivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
