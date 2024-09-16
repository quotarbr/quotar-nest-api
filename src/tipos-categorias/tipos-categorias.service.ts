import { Injectable } from '@nestjs/common';
import { CreateTiposCategoriaDto } from './dto/create-tipos-categoria.dto';
import { UpdateTiposCategoriaDto } from './dto/update-tipos-categoria.dto';
import { FiltrarTiposCategoriaDto } from './dto/filtrar-tipos-categoria.dto';

@Injectable()
export class TiposCategoriasService {
  async create(createTiposCategoriaDto: CreateTiposCategoriaDto) {
    return 'This action adds a new tiposCategoria';
  }

  async findAll(params: FiltrarTiposCategoriaDto) {
    return `This action returns all tiposCategorias`;
  }

  async findOne(tpId: number, catId: number) {
    return; 
  }

  async update(tpId: number, catId: number, updateTiposCategoriaDto: UpdateTiposCategoriaDto) {
    return;
  }

  async remove(tpId: number, catId: number) {
    return;
  }
}
