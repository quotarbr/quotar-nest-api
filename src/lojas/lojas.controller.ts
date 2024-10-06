import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, NotFoundException, InternalServerErrorException, HttpStatus, Query } from '@nestjs/common';
import { LojasService } from './lojas.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { FiltrarLojasDto } from './dto/filtrar-loja.dto';

@Controller('lojas')
export class LojasController {
  constructor(private readonly lojasService: LojasService) {}

  @Post()
  create(@Body() createLojaDto: CreateLojaDto) {
    try{
      return this.lojasService.create(createLojaDto);
    } catch(e) {
      throw new  HttpException( e.message || "Ocorreu um erro ao cadastrar loja.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll(@Query() params: FiltrarLojasDto) {
    try {
      return this.lojasService.findAll(params);
    } catch(e) {
      throw new InternalServerErrorException( e.message || "Ocorreu um erro ao buscar lojas.");
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lojasService.findOne(+id);
  }

  //criar updateme

  @Patch(':id')
  //guard agente
  update(@Param('id') id: string, @Body() updateLojaDto: UpdateLojaDto) {
    return this.lojasService.update(+id, updateLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lojasService.remove(+id);
  }
}
