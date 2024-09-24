import { BadRequestException, HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FiltrarEstadoDto } from './dto/filtrar-estado.dto';

@Injectable()
export class EstadosService {

  constructor(
    private prismaService: PrismaService
  ){}

  async create(createEstadoDto: CreateEstadoDto) {
    const { est_nome, est_sigla } = createEstadoDto

    const [hasNome, hasSigla] = await Promise.all([
      this.prismaService.estado.findFirst({ where: { est_nome } }),
      this.prismaService.estado.findFirst({ where: { est_sigla }})
    ])
    if(hasNome)   throw new BadRequestException("Nome de estado já existe!");
    if(hasSigla)  throw new BadRequestException("Sigla de estado já existe!");

    const data: Prisma.EstadoCreateInput ={
      est_nome: createEstadoDto.est_nome,
      est_sigla: createEstadoDto.est_sigla
    }
    const estado = await this.prismaService.estado.create({data});

    return {
      id: estado.est_id,
      message: 'Estado criado com sucesso!',
      statusCode: HttpStatus.OK
    }
  }

  async findAll(params?: FiltrarEstadoDto) {
    const whereClause: Prisma.EstadoWhereInput = {}

    if(params?.string){
      whereClause.OR = [
        { est_nome: { contains: params.string.trim()} },
        { est_sigla: { contains: params.string.trim()} },
        { est_id: +params.string || 0 }
      ]
    }
    const pagina  = ( +params?.pagina || 1 );
    const limite  = ( +params?.limite || 10 );
    const skip    = ( pagina - 1 ) * limite;
    const take    = limite;
    
    const estados = await this.prismaService.estado.findMany({
      where: whereClause,
      take,
      skip,
      orderBy: { est_nome: 'asc'},
      select:{
        est_id: true,
        est_nome: true,
        est_sigla: true,
        cidades: {
          select: {
            cid_id: true,
            cid_nome: true
          }
        }
      }
    });

    const total = await this.prismaService.estado.count({where: whereClause});
    return {
      statusCode: HttpStatus.OK,
      pagina,
      total_paginas: Math.floor(total / limite),
      limite,
      total,
      total_resultados: estados.length,
      resultados: estados
    }
  }

  async findOne(id: number) {
    const data = await this.ensureEstadoExist(id);
    return {
      statusCode: HttpStatus.OK,
      resultado: data
    }
  }

  async update(id: number, updateEstadoDto: UpdateEstadoDto) {
    
    await this.ensureEstadoExist(id);

    await this.validaUpdateInput(id, updateEstadoDto, 'est_nome', 'Nome de estado já existe!');
    await this.validaUpdateInput(id, updateEstadoDto, 'est_sigla', 'Sigla de estado já existe!');

    const estado = await this.prismaService.estado.update({
      where: {est_id: id},
      data: {...updateEstadoDto}
    })

    return {
      id: estado.est_id,
      message: 'Estado atualizado com sucesso!',
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    const estado = await this.ensureEstadoExist(id);
    await this.prismaService.estado.delete({ where: { est_id: id } })

    return {
      id: estado.est_id,
      message: 'Estado removido com sucesso!',
      statusCode: HttpStatus.OK
    }
  }

  async ensureEstadoExist(id:number){
    const estado = await this.prismaService.estado.findUnique({
      where: { est_id: id },
      select: {
        est_id: true,
        est_nome: true,
        est_sigla: true,
        cidades: {
          select: {
            cid_id: true,
            cid_nome: true
          }
        }
      }
    })
    if(!estado) throw new NotFoundException('Estado não encontrado.');
    return estado;
  }

  async validaUpdateInput(id: number, updateEstadoDto: UpdateEstadoDto, property?: string, msgBadRequest?: string){
    if(updateEstadoDto.hasOwnProperty(property)){
      const hasProperty = await this.prismaService.estado.findFirst({
        where: { [property]: updateEstadoDto[property], est_id: {not: id} }
      })
      if(hasProperty) throw new BadRequestException(msgBadRequest);
    }
  }
}
