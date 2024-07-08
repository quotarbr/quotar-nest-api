import { Test, TestingModule } from '@nestjs/testing';
import { OpcoesService } from './opcoes.service';

describe('OpcoesService', () => {
  let service: OpcoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpcoesService],
    }).compile();

    service = module.get<OpcoesService>(OpcoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
