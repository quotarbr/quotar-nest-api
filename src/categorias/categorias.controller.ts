import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { FiltrarCategoriaDto } from './dto/filtrar-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() CategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(CategoriaDto);
  }

  @Get()
  findAll(@Query() params: FiltrarCategoriaDto) {
    return this.categoriasService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}
