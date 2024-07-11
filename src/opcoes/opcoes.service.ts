import { Injectable } from '@nestjs/common';
import { UpdateOpcoeDto } from './dto/update-opcoe.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpcaoDto } from './dto/opcao.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OpcoesService {
  constructor(private prismaService: PrismaService){}

  async create(opcaoDto: OpcaoDto[], prodt_id: number) {
    const data: Prisma.OpcaoUncheckedCreateInput[] = opcaoDto.map( opcao => ({
      opc_nome: opcao.opc_nome,
      opc_valores: JSON.stringify(opcao.opc_valores),
      prodt_id: prodt_id
    }))
    return await this.prismaService.opcao.createMany({data})
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
