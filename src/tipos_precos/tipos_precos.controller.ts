import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposPrecosService } from './tipos_precos.service';
import { CreateTiposPrecoDto } from './dto/create-tipos_preco.dto';
import { UpdateTiposPrecoDto } from './dto/update-tipos_preco.dto';

@Controller('tipos-precos')
export class TiposPrecosController {
  constructor(private readonly tiposPrecosService: TiposPrecosService) {}

  @Post()
  create(@Body() createTiposPrecoDto: CreateTiposPrecoDto) {
    return this.tiposPrecosService.create(createTiposPrecoDto);
  }

  @Get()
  findAll() {
    return this.tiposPrecosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposPrecosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposPrecoDto: UpdateTiposPrecoDto) {
    return this.tiposPrecosService.update(+id, updateTiposPrecoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposPrecosService.remove(+id);
  }
}
