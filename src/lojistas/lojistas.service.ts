import { Injectable } from '@nestjs/common';
import { CreateLojistaDto } from './dto/create-lojista.dto';
import { UpdateLojistaDto } from './dto/update-lojista.dto';

@Injectable()
export class LojistasService {
  create(createLojistaDto: CreateLojistaDto) {
    return 'This action adds a new lojista';
  }

  findAll() {
    return `This action returns all lojistas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lojista`;
  }

  update(id: number, updateLojistaDto: UpdateLojistaDto) {
    return `This action updates a #${id} lojista`;
  }

  remove(id: number) {
    return `This action removes a #${id} lojista`;
  }
}
