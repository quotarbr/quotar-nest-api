import { Test, TestingModule } from '@nestjs/testing';
import { TiposPrecosService } from './tipos_precos.service';

describe('TiposPrecosService', () => {
  let service: TiposPrecosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposPrecosService],
    }).compile();

    service = module.get<TiposPrecosService>(TiposPrecosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
