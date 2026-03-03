import { Test, TestingModule } from '@nestjs/testing';
import { ParfumsService } from './parfums.service';

describe('ParfumsService', () => {
  let service: ParfumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParfumsService],
    }).compile();

    service = module.get<ParfumsService>(ParfumsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
