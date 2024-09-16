import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TiposCategoriasService } from './tipos-categorias.service';
import { CreateTiposCategoriaDto } from './dto/create-tipos-categoria.dto';
import { UpdateTiposCategoriaDto } from './dto/update-tipos-categoria.dto';
import { FiltrarTiposCategoriaDto } from './dto/filtrar-tipos-categoria.dto';

@Controller('tipos-categorias')
export class TiposCategoriasController {
  constructor(private readonly tiposCategoriasService: TiposCategoriasService) {}

  @Post()
  create(@Body() createTiposCategoriaDto: CreateTiposCategoriaDto) {
    return this.tiposCategoriasService.create(createTiposCategoriaDto);
  }

  @Get()
  findAll(@Query() params: FiltrarTiposCategoriaDto) {
    return this.tiposCategoriasService.findAll(params);
  }

  @Get(':tpId/:catId')
  findOne(@Param('tpId') tpId: string, @Param('catId') catId: string) {
    return this.tiposCategoriasService.findOne(+tpId, +catId);
  }

  @Patch(':tpId/:catId:id')
  update(@Param('tpId') tpId: string, @Param('catId') catId: string, @Body() updateTiposCategoriaDto: UpdateTiposCategoriaDto) {
    return this.tiposCategoriasService.update(+tpId, +catId, updateTiposCategoriaDto);
  }

  @Delete(':tpId/:catId:id')
  remove(@Param('tpId') tpId: string, @Param('catId') catId: string) {
    return this.tiposCategoriasService.remove(+tpId, +catId);
  }
}
