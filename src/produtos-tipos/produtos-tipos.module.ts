import { Module } from '@nestjs/common';
import { ProdutosTiposService } from './produtos-tipos.service';
import { ProdutosTiposController } from './produtos-tipos.controller';

@Module({
  controllers: [ProdutosTiposController],
  providers: [ProdutosTiposService],
})
export class ProdutosTiposModule {}
