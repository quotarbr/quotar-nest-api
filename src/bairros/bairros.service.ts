import { HttpCode, Injectable } from '@nestjs/common';
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
    return this.prismaService.bairro.findUnique({
      where: {bai_id: id}
    });
  }

  update(id: number, updateBairroDto: UpdateBairroDto) {
    return this.prismaService.bairro.update({
      data: updateBairroDto,
      where: {bai_id: id}
    });
  }

  @HttpCode(204)
  remove(id: number) {
    return this.prismaService.bairro.delete({
      where: {bai_id: id}
    });
  }
}
