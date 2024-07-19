import { Test, TestingModule } from '@nestjs/testing';
import { BairrosService } from './bairros.service';

describe('BairrosService', () => {
  let service: BairrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BairrosService],
    }).compile();

    service = module.get<BairrosService>(BairrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
