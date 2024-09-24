import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FiltrarCidadeDto } from './dto/filtrar-cidade.dto';

@Injectable()
export class CidadesService {

  constructor(
    private prismaService: PrismaService
  ){}

  async create(createCidadeDto: CreateCidadeDto) {
    const { cid_nome, est_id } = createCidadeDto;
    
    const hasCidadeNome = await this.prismaService.cidade.findFirst({ where: { cid_nome } });
    if(hasCidadeNome) throw new BadRequestException("Cidade já cadastrado"); 

    const hasEstado = await this.prismaService.estado.findUnique({ where: { est_id: createCidadeDto.est_id }})
    if(!hasEstado) throw new BadRequestException('Estado não encontrado!');
    
    const data: Prisma.CidadeUncheckedCreateInput = {
      cid_nome: createCidadeDto.cid_nome,
      est_id: createCidadeDto.est_id
    }
    const cidade = await this.prismaService.cidade.create({data})

    return {
      id: cidade.cid_id,
      message: 'Cidade criada com sucesso!',
      statusCode: HttpStatus.OK
    }
  }

  async findAll(params: FiltrarCidadeDto) {
    const whereClause: Prisma.CidadeWhereInput = {}

    if(params?.string){
      whereClause.OR = [
        { cid_nome: {contains: params.string.trim()}},
        { cid_id: +params.string || 0 }
      ]
    }

    const pagina =  (+params.pagina || 1);
    const limite = (+params.limite || 10);
    const skip = (( pagina - 1 ) * limite); 
    const take = limite

    const cidades = await this.prismaService.cidade.findMany({
      where: whereClause,
      take: take,
      skip: skip, 
      orderBy: { cid_id: 'desc'},
      select: {
        cid_id: true,
        cid_nome: true,
        est_id: true,
        estados: {
          select: {
            est_nome: true
          }
        },
        bairros: {
          select: {
            bai_nome: true
          }
        }
      }
    });

    const total = await this.prismaService.cidade.count({ where: whereClause});

    return {
      statusCode: HttpStatus.OK,
      paginas: Math.ceil( total / limite),
      pagina,
      limite,
      total: total,
      total_pagina: cidades.length,
      resultados: cidades
    }
  }

  async findOne(id: number) {
    const cidade = await this.ensureCidadeExists(id);
    await this.prismaService.cidade.findUnique({ where: {cid_id: id} });
    return {
      statusCode: HttpStatus.OK,
      resultado: cidade
    }
  }

  async update(id: number, updateCidadeDto: UpdateCidadeDto) {
    const oldCidade = this.ensureCidadeExists(id);

    if(updateCidadeDto.hasOwnProperty('cid_nome')){
      const hasCidade = await this.prismaService.cidade.findFirst({ where: { cid_nome: updateCidadeDto.cid_nome, cid_id: {not: id} }})
      if(hasCidade) throw new BadRequestException('Cidade já cadastrada!');
    }

    if(updateCidadeDto.hasOwnProperty('est_id')){
      const hasEstado = await this.prismaService.estado.findUnique({ where: { est_id: updateCidadeDto.est_id }});
      if(!hasEstado) throw new BadRequestException('Estado não encontrado!');
    }

    const cidade = await this.prismaService.cidade.update({
      data: {...updateCidadeDto},
      where: {cid_id : id}
    })

    return {
      id:cidade.cid_id,
      message: 'Cidade atualizada com sucesso!',
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    const cidade = await this.ensureCidadeExists(id);
    await this.prismaService.cidade.delete({ where: {cid_id: id} });
    return {
      id: cidade.cid_id,
      message: 'Cidade deletada com sucesso!',
      statusCode: HttpStatus.OK
    }
  }

  async ensureCidadeExists(id: number){
    const cidade = await this.prismaService.cidade.findUnique({
      where: { cid_id: id },
      select: {
        cid_id: true,
        cid_nome: true,
        est_id: true,
        estados: {
          select: {
            est_nome: true
          }
        },
        bairros: {
          select: {
            bai_nome: true
          }
        }
      }
    })

    if(!cidade) throw new BadRequestException('Cidade não encontrada!');
    return cidade;
  }
}
