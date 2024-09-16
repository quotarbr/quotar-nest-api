import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProdutosTiposService } from './produtos-tipos.service';
import { CreateProdutoTipoDto } from './dto/create-produtos-tipo.dto';
import { UpdateProdutosTipoDto } from './dto/update-produtos-tipo.dto';
import { FiltrarProdutoTipoDto } from './dto/filtrar-produto-tipo.dto';

@Controller('produtos-tipos')
export class ProdutosTiposController {
  constructor(private readonly produtosTiposService: ProdutosTiposService) {}

  @Post()
  create(@Body() createProdutosTipoDto: CreateProdutoTipoDto) {
    return this.produtosTiposService.create(createProdutosTipoDto);
  }

  @Get()
  findAll(@Query() params: FiltrarProdutoTipoDto) {
    return this.produtosTiposService.findAll(params);
  }

  @Get(':prodId/:tpId')
  findOne(@Param('prodId') prodId: string, @Param('tpId') tpId: string) {
    return this.produtosTiposService.findOne(+prodId, +tpId);
  }

  @Patch(':prodId/:tpId')
  update(@Param('prodId') prodId: string, @Param('tpId') tpId: string, @Body() updateProdutosTipoDto: UpdateProdutosTipoDto) {
    return this.produtosTiposService.update(+prodId, +tpId, updateProdutosTipoDto);
  }

  @Delete(':prodId/:tpId')
  remove(@Param('prodId') prodId: string,  @Param('tpId') tpId: string ) {
    return this.produtosTiposService.remove(+prodId, +tpId);
  }
}
