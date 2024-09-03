import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { OpcoesService } from 'src/opcoes/opcoes.service';
import { CategoriasService } from 'src/categorias/categorias.service';
import { TiposService } from 'src/tipos/tipos.service';
import { LojasService } from 'src/lojas/lojas.service';
import { TiposPrecosService } from 'src/tipos_precos/tipos_precos.service';
import { VariantesService } from 'src/variantes/variantes.service';

@Module({
  controllers: [ProdutosController],
  providers: [
    ProdutosService, 
    CategoriasService,
    TiposService,
    LojasService,
    OpcoesService, 
    TiposPrecosService,
    VariantesService,
  ],
})
export class ProdutosModule {}
