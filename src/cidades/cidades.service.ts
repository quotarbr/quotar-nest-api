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
    return `This action returns a #${id} cidade`;
  }

  update(id: number, updateCidadeDto: UpdateCidadeDto) {
    return `This action updates a #${id} cidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} cidade`;
  }
}
