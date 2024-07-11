import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { OpcoesService } from 'src/opcoes/opcoes.service';
import { CategoriasService } from 'src/categorias/categorias.service';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService, OpcoesService, CategoriasService],
})
export class ProdutosModule {}
