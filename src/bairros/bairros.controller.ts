import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BairrosService } from './bairros.service';
import { CreateBairroDto } from './dto/create-bairro.dto';
import { UpdateBairroDto } from './dto/update-bairro.dto';

@Controller('bairros')
export class BairrosController {
  constructor(private readonly bairrosService: BairrosService) {}

  @Post()
  create(@Body() createBairroDto: CreateBairroDto) {
    return this.bairrosService.create(createBairroDto);
  }

  @Get()
  findAll() {
    return this.bairrosService.findAll();
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
