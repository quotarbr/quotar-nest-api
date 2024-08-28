import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { FiltrosDto } from './dto/filtros-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() reqProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(reqProdutoDto);
  }

  @Get()
  findAll(@Query() filtros: FiltrosDto ) {
    return this.produtosService.findAll(filtros);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
