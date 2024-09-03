import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, NotFoundException, InternalServerErrorException, HttpStatus, Query, UseGuards, Req } from '@nestjs/common';
import { LojasService } from './lojas.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { FiltrarLojaDto } from './dto/filtrar-loja.dto';
import { EnsureLojistaAuthenticateGuard } from 'src/guards/lojista-authenticate.guard';
import { Request } from 'express';

@Controller('lojas')
export class LojasController {
  constructor(private readonly lojasService: LojasService) {}

  @Post()
  @UseGuards(EnsureLojistaAuthenticateGuard)
  create(
    @Req() { lojst_id }: Request,
    @Body() createLojaDto: CreateLojaDto
  ) {
      return this.lojasService.create(createLojaDto, +lojst_id);
  }

  @Get('minhas-lojas')
  @UseGuards(EnsureLojistaAuthenticateGuard)
  findMinhasLojas(
    @Req() { lojst_id }: Request,
    @Query() params : FiltrarLojaDto
  ) {
    params.loja = lojst_id.toString();
    return this.lojasService.findAll( params);
  }

  @Get()
  findAll(
    @Query() params : FiltrarLojaDto
  ) {
    return this.lojasService.findAll( params);
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lojasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLojaDto: UpdateLojaDto) {
    return this.lojasService.update(+id, updateLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lojasService.remove(+id);
  }
}
