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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosTiposService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutosTipoDto: UpdateProdutosTipoDto) {
    return this.produtosTiposService.update(+id, updateProdutosTipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosTiposService.remove(+id);
  }
}
