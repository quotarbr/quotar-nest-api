import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpcoesService } from './opcoes.service';
import { CreateOpcoeDto } from './dto/create-opcoe.dto';
import { UpdateOpcoeDto } from './dto/update-opcoe.dto';

@Controller('opcoes')
export class OpcoesController {
  constructor(private readonly opcoesService: OpcoesService) {}

  @Post()
  create(@Body() createOpcoeDto: CreateOpcoeDto) {
    return this.opcoesService.create(createOpcoeDto);
  }

  @Get()
  findAll() {
    return this.opcoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opcoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpcoeDto: UpdateOpcoeDto) {
    return this.opcoesService.update(+id, updateOpcoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opcoesService.remove(+id);
  }
}
