import { Injectable } from '@nestjs/common';
import { CreateOpcoeDto } from './dto/create-opcoe.dto';
import { UpdateOpcoeDto } from './dto/update-opcoe.dto';

@Injectable()
export class OpcoesService {
  create(createOpcoeDto: CreateOpcoeDto) {
    return 'This action adds a new opcoe';
  }

  findAll() {
    return `This action returns all opcoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} opcoe`;
  }

  update(id: number, updateOpcoeDto: UpdateOpcoeDto) {
    return `This action updates a #${id} opcoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} opcoe`;
  }
}
