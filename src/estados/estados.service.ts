import { HttpCode, Injectable } from '@nestjs/common';
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
    return this.prismaService.estado.findUnique({
      where: {est_id: id}
    })
  }

  update(id: number, updateEstadoDto: UpdateEstadoDto) {
    return this.prismaService.estado.update({
      data: updateEstadoDto,
      where: {est_id: id}
    })
  }
  @HttpCode(204)
  remove(id: number) {
    return this.prismaService.estado.delete({
      where: { est_id: id }
    })
  }
}
