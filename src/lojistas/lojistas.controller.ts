import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Req, UseGuards } from '@nestjs/common';
import { LojistasService } from './lojistas.service';
import { CreateLojistaDto } from './dto/create-lojista.dto';
import { UpdateLojistaDto } from './dto/update-lojista.dto';
import { FiltrarLojistaDto } from './dto/filtrar-lojista.dto';
import { Request } from 'express';
import { EnsureLojistaAuthenticateGuard } from 'src/guards/lojista-authenticate.guard';

@Controller('lojistas')
export class LojistasController {
  constructor(private readonly lojistasService: LojistasService) {}

  @Post('login')
  login(@Body() { lojst_login, lojst_senha }: {lojst_login: string, lojst_senha: string}) {
    return this.lojistasService.login(lojst_login, lojst_senha );
  }

  @Post()
  create(@Body() createLojistaDto: CreateLojistaDto) {
    return this.lojistasService.create(createLojistaDto);
  }

  @Get()
  findAll(
    @Query() params : FiltrarLojistaDto
  ) {
    return this.lojistasService.findAll(params);
  }

  @Get('me')
  @UseGuards(EnsureLojistaAuthenticateGuard)
  findMe(
    @Req() { lojst_id }: Request,
  ) {
    return this.lojistasService.findMe(+lojst_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lojistasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLojistaDto: UpdateLojistaDto) {
    return this.lojistasService.update(+id, updateLojistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lojistasService.remove(+id);
  }
}
