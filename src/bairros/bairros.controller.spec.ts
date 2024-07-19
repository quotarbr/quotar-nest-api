import { Test, TestingModule } from '@nestjs/testing';
import { BairrosController } from './bairros.controller';
import { BairrosService } from './bairros.service';

describe('BairrosController', () => {
  let controller: BairrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BairrosController],
      providers: [BairrosService],
    }).compile();

    controller = module.get<BairrosController>(BairrosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
