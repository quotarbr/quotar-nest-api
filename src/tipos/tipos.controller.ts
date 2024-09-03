import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposService } from './tipos.service';
import { TipoDto } from './dto/tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';

@Controller('tipos')
export class TiposController {
  constructor(private readonly tiposService: TiposService) {}

  @Post()
  create(@Body() createTipoDto: TipoDto) {
    return this.tiposService.create(createTipoDto);
  }

  @Get()
  findAll() {
    return this.tiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoDto: UpdateTipoDto) {
    return this.tiposService.update(+id, updateTipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposService.remove(+id);
  }
}
