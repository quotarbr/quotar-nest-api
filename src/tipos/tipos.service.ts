import { Injectable } from '@nestjs/common';
import { TipoDto } from './dto/tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TiposService {
  constructor(private prismaService: PrismaService){}

  async create(tipoDto: TipoDto) {
    const data: Prisma.TipoUncheckedCreateInput = {
      tp_nome: tipoDto.tp_nome,
      cat_id: tipoDto.cat_id
    }

    return await this.prismaService.tipo.create({data})
  }

  findAll() {
    return `This action returns all tipos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipo`;
  }

  update(id: number, updateTipoDto: UpdateTipoDto) {
    return `This action updates a #${id} tipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipo`;
  }
}
