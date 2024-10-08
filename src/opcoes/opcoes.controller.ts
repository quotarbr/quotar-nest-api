import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { OpcoesService } from './opcoes.service';
import { CreateOpcaoDto } from './dto/create-opcao.dto';
import { UpdateOpcaoDto } from './dto/update-opcao.dto';
import { FiltrarOpcaoDto } from './dto/filtrar-opcao.dto';

@Controller('opcoes')
export class OpcoesController {

constructor(private opcaoService: OpcoesService) {}

  @Post()
  create(@Body() createOpcaoDto: CreateOpcaoDto[]) {
    return this.opcaoService.create(createOpcaoDto);
  }

  @Get()
  findAll(@Query() params: FiltrarOpcaoDto) {
    try {
      return this.opcaoService.findAll(params);
    }catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opcaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLojistaDto: UpdateOpcaoDto) {
    return this.opcaoService.update(+id, updateLojistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opcaoService.remove(+id);
  }

}
