import { Test, TestingModule } from '@nestjs/testing';
import { OpcoesController } from './opcoes.controller';
import { OpcoesService } from './opcoes.service';

describe('OpcoesController', () => {
  let controller: OpcoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpcoesController],
      providers: [OpcoesService],
    }).compile();

    controller = module.get<OpcoesController>(OpcoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
