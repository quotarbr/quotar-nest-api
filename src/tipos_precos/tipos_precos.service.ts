import { Injectable } from '@nestjs/common';
import { CreateTiposPrecoDto } from './dto/create-tipos_preco.dto';
import { UpdateTiposPrecoDto } from './dto/update-tipos_preco.dto';

@Injectable()
export class TiposPrecosService {
  create(createTiposPrecoDto: CreateTiposPrecoDto) {
    return 'This action adds a new tiposPreco';
  }

  findAll() {
    return `This action returns all tiposPrecos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiposPreco`;
  }

  update(id: number, updateTiposPrecoDto: UpdateTiposPrecoDto) {
    return `This action updates a #${id} tiposPreco`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiposPreco`;
  }
}
