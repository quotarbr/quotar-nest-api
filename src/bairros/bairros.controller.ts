import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { BairrosService } from './bairros.service';
import { CreateBairroDto } from './dto/create-bairro.dto';
import { UpdateBairroDto } from './dto/update-bairro.dto';
import { FiltrarBairroDto } from './dto/filtrar-bairro.dto';

@Controller('bairros')
export class BairrosController {
  constructor(private readonly bairrosService: BairrosService) {}

  @Post()
  create(@Body() createBairroDto: CreateBairroDto) {
    return this.bairrosService.create(createBairroDto);
  }

  @Get()
  findAll(@Query() params: FiltrarBairroDto) {
    return this.bairrosService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bairrosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBairroDto: UpdateBairroDto) {
    return this.bairrosService.update(+id, updateBairroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bairrosService.remove(+id);
  }
}
