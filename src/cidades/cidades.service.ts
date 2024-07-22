import { Injectable } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CidadesService {

  constructor(
    private prismaService: PrismaService
  ){}

  create(createCidadeDto: CreateCidadeDto) {

    const data: Prisma.CidadeUncheckedCreateInput = {
      cid_nome: createCidadeDto.cid_nome,
      est_id: createCidadeDto.est_id
    }
    return this.prismaService.cidade.create({data})
  }

  findAll() {
    return this.prismaService.cidade.findMany();
  }

  findOne(id: number) {
    return this.prismaService.cidade.findUnique({
      where: {cid_id: id}
    })
  }

  update(id: number, updateCidadeDto: UpdateCidadeDto) {
    return this.prismaService.cidade.update({
      data: updateCidadeDto,
      where: {cid_id : id}
    })
  }

  remove(id: number) {
    return this.prismaService.cidade.delete({
      where: {cid_id: id}
    })
  }
}
