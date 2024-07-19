import { Injectable } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EstadosService {

  constructor(
    private prismaService: PrismaService
  ){}

  async create(createEstadoDto: CreateEstadoDto) {
    const data: Prisma.EstadoUncheckedCreateInput ={
      est_nome: createEstadoDto.est_nome
    }
    return await this.prismaService.estado.create({data});
  }

  findAll() {
    return this.prismaService.estado.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} estado`;
  }

  update(id: number, updateEstadoDto: UpdateEstadoDto) {
    return `This action updates a #${id} estado`;
  }

  remove(id: number) {
    return `This action removes a #${id} estado`;
  }
}
