import { Test, TestingModule } from '@nestjs/testing';
import { TiposPrecosController } from './tipos_precos.controller';
import { TiposPrecosService } from './tipos_precos.service';

describe('TiposPrecosController', () => {
  let controller: TiposPrecosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposPrecosController],
      providers: [TiposPrecosService],
    }).compile();

    controller = module.get<TiposPrecosController>(TiposPrecosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
