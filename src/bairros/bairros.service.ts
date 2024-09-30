import {
  BadRequestException, HttpStatus,
  Injectable
} from '@nestjs/common';
import { CreateBairroDto } from './dto/create-bairro.dto';
import { UpdateBairroDto } from './dto/update-bairro.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FiltrarBairroDto } from './dto/filtrar-bairro.dto';

@Injectable()
export class BairrosService {
  constructor(private prismaService: PrismaService) {}

  async create(createBairroDto: CreateBairroDto) {
    const hasBairro = await this.prismaService.bairro.findFirst({
      where: { bai_nome: createBairroDto.bai_nome },
    });
    if (hasBairro) throw new BadRequestException('Bairro já cadastrado.');

    const hasCidade = this.prismaService.cidade.findUnique({
      where: { cid_id: createBairroDto.cid_id },
    });
    if (!hasCidade) throw new BadRequestException('Cidade não encontrada!');

    const data: Prisma.BairroCreateInput = {
      bai_nome: createBairroDto.bai_nome,
      cidades: { connect: { cid_id: createBairroDto.cid_id } },
    };
    const bairro = await this.prismaService.bairro.create({ data });

    return {
      id: bairro.bai_id,
      message: 'Bairro cadastrada com sucesso!',
      resultado: bairro,
    };
  }

  async findAll(params?: FiltrarBairroDto) {
    const whereClause: Prisma.BairroWhereInput = {};

    if (params?.string) {
      whereClause.OR = [
        { bai_nome: { contains: params.string.trim() } },
        { bai_id: +params.string || 0 },
      ];
    }

    const pagina = +params?.pagina || 1;
    const limite = +params?.limite || 10;
    const skip = ( pagina - 1 ) * limite;
    const take = limite;

    const bairros = await this.prismaService.bairro.findMany({
      where: whereClause,
      take,
      skip,
      orderBy: {bai_nome : 'asc'},
      select: {
        bai_id: true,
        bai_nome: true,
        cidades: {
          select: {
            cid_id: true,
            cid_nome: true,
            estados: {
              select: {
                est_id: true,
                est_nome: true,
              },
            },
          },
        },
      },
    });

    const total = await this.prismaService.bairro.count({ where: whereClause });
    return {
      statusCode: HttpStatus.OK,
      pagina,
      total_paginas: Math.floor(total / limite),
      limite,
      total,
      total_resultados: bairros.length,
      resultados: bairros,
    };
  }

  async findOne(id: number) {
    const data = await this.ensureBairroExist(id);
    return {
      statusCode: HttpStatus.OK,
      resultado: data
    }
  }

  async update(id: number, updateBairroDto: UpdateBairroDto) {
    await this.ensureBairroExist(id);

    if(updateBairroDto.hasOwnProperty('bai_nome')) {
      const hasBairro = await this.prismaService.bairro.findFirst({
        where: {
          bai_nome: updateBairroDto.bai_nome, 
          cid_id: updateBairroDto.cid_id,
          bai_id: {not: id}}
      })
      if(hasBairro) throw new BadRequestException('Bairro já cadastrado!');
    }

    if(updateBairroDto.hasOwnProperty('cid_id')) {
      const hasCidade = await this.prismaService.cidade.findFirst({ where: { cid_id: updateBairroDto.cid_id }})
      if(!hasCidade) throw new BadRequestException('Cidade não encontrada!');
    }

    const bairro = await this.prismaService.bairro.update({
      data: {...updateBairroDto},
      where: { bai_id: id }
    });

    return {
      id: bairro.bai_id,
      message: "Bairro atualizado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    const bairro = await this.ensureBairroExist(id);
    await this.prismaService.bairro.delete({
      where: { bai_id: id },
    });
    return {
      id: bairro.bai_id,
      message: "Bairro deletado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  async ensureBairroExist(id: number) {
    const bairro = await this.prismaService.bairro.findUnique({
      where: {bai_id: id},
      select:{
        bai_id: true,
        bai_nome: true,
        cidades: {
          select: {
            cid_id: true,
            cid_nome: true,
            estados: {
              select: {
                est_id: true,
                est_nome: true,
              },
            },
          },
        },
      }
    });
    if(!bairro) throw new BadRequestException('Bairro não encontrado');
    return bairro;
  }
}
