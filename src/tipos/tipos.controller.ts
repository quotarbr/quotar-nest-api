import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TiposService } from './tipos.service';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { FiltrarTipoDto } from './dto/filtrar-tipo.dto';

@Controller('tipos')
export class TiposController {
  constructor(private readonly tiposService: TiposService) {}

  @Post()
  create(@Body() createTipoDto: CreateTipoDto) {
    return this.tiposService.create(createTipoDto);
  }

  @Get()
  findAll(@Query() params: FiltrarTipoDto) {
    return this.tiposService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoDto: UpdateTipoDto) {
    return this.tiposService.update(+id, updateTipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposService.remove(+id);
  }
}