import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Req, Query } from '@nestjs/common';
import { LojistasService } from './lojistas.service';
import { CreateLojistaDto } from './dto/create-lojista.dto';
import { UpdateLojistaDto } from './dto/update-lojista.dto';
import { EnsureLojistaAuthenticateGuard } from 'src/guards/lojista-auth.guard';
import { Request } from 'express';
import { FiltrarLojistaDto } from './dto/filtrar-lojista.dto';

@Controller('lojistas')
export class LojistasController {
  constructor(private readonly lojistasService: LojistasService) {}

  @Post('login')
  login(@Body() {login, senha }: { login: string, senha: string }){
    return this.lojistasService.login(login,senha);
  }

  @Post()
  create(@Body() createLojistaDto: CreateLojistaDto) {
    return this.lojistasService.create(createLojistaDto);
  }

  // @Get('me')
  // @UseGuards(EnsureLojistaAuthenticateGuard)
  // findMe(@Req() { lojst_id } : Request) {
  //   return this.lojistasService.findMe(+lojst_id);
  // }

  //updateMe

  @Get()
  findAll(@Query() params: FiltrarLojistaDto) {
    try {
      return this.lojistasService.findAll(params);
    }catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lojistasService.findOne(+id);
  }

  @Patch(':id')
  //guard agente
  update(@Param('id') id: string, @Body() updateLojistaDto: UpdateLojistaDto) {
    return this.lojistasService.update(+id, updateLojistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lojistasService.remove(+id);
  }  
}
