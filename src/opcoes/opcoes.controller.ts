import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { OpcoesService } from './opcoes.service';
import { CreateOpcaoDto } from './dto/create-opcao.dto';
import { UpdateOpcaoDto } from './dto/update-opcao.dto';
import { FiltrarOpcaoDto } from './dto/filtrar-opcao.dto';

@Controller('opcoes')
export class OpcoesController {

constructor(private opcaoService: OpcoesService) {}

  @Post()
  async create(@Body() createOpcaoDto: CreateOpcaoDto) {
    return await this.opcaoService.create(createOpcaoDto);
  }

  @Get()
  async findAll(@Query() params: FiltrarOpcaoDto) {
    return await this.opcaoService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opcaoService.findOne(+id);
  }

  @Patch()
  update( @Body() updateLojistaDto: UpdateOpcaoDto) {
    return this.opcaoService.update(updateLojistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opcaoService.remove(+id);
  }

}
