import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LojistasService } from './lojistas.service';
import { CreateLojistaDto } from './dto/create-lojista.dto';
import { UpdateLojistaDto } from './dto/update-lojista.dto';

@Controller('lojistas')
export class LojistasController {
  constructor(private readonly lojistasService: LojistasService) {}

  @Post()
  create(@Body() createLojistaDto: CreateLojistaDto) {
    return this.lojistasService.create(createLojistaDto);
  }

  @Get()
  findAll() {
    return this.lojistasService.findAll();
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
