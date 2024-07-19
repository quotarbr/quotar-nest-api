import { Injectable } from '@nestjs/common';
import { CreateBairroDto } from './dto/create-bairro.dto';
import { UpdateBairroDto } from './dto/update-bairro.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BairrosService {

  constructor(
    private prismaService: PrismaService
  ){}

  create(createBairroDto: CreateBairroDto) {
    const data: Prisma.BairroUncheckedCreateInput = {
      bai_nome: createBairroDto.bai_nome,
      cid_id: createBairroDto.cid_id
    }
    
    return this.prismaService.bairro.create({data})
  }

  findAll() {
    return this.prismaService.bairro.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} bairro`;
  }

  update(id: number, updateBairroDto: UpdateBairroDto) {
    return `This action updates a #${id} bairro`;
  }

  remove(id: number) {
    return `This action removes a #${id} bairro`;
  }
}
