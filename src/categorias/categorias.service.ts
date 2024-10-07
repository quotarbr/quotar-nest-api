import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FiltrarCategoriaDto } from './dto/filtrar-categoria.dto';

@Injectable()
export class CategoriasService {

  constructor(private prismaService: PrismaService){}

  async create(categoriaDto: CreateCategoriaDto) {
    const {cat_nome} = categoriaDto
    const hasCategoria = await this.prismaService.categoria.findFirst({ where: { cat_nome } });
    if(hasCategoria){ throw new BadRequestException("Categoria já cadastrada.") }

    const data: Prisma.CategoriaCreateInput = {
      cat_nome: categoriaDto.cat_nome, 
    }

    const categoria = await this.prismaService.categoria.create({data});
    return {
      id: categoria.cat_id,
      message: "Categoria cadastrada com sucesso.",
      statusCode: HttpStatus.OK
    }
    
  }

  async findAll(params: FiltrarCategoriaDto) {
    const whereClause: Prisma.CategoriaWhereInput = {}

    if(params?.string){ 
      whereClause.OR = [
        {cat_nome: {contains: params.string.trim()}},
        {cat_id: +params.string || 0}
      ]
    }
    
    const pagina  = ( +params?.pagina || 1 );
    const limite  = ( +params?.limite || 10 );
    const skip    = ( pagina - 1 ) * limite ;
    const take    = limite;

    const categorias = await this.prismaService.categoria.findMany({
      where: whereClause,
      skip,
      take,
      orderBy:{
        cat_id: 'desc'
      },
      select: {
        cat_id:true,
        cat_nome: true
      }
    });

    const total = await this.prismaService.categoria.count({where: whereClause});
    return {
      statusCode: HttpStatus.OK,
      pagina,
      total_paginas: Math.floor( total / limite ),
      limite,
      total,
      total_resultados: categorias.length,
      resultados: categorias
    }
  }

  async findOne(id: number) {
    const data = await this.ensureCategoriaExists(id);
    return {
      statusCode: HttpStatus.OK,
      resultado: data
    }
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    await this.ensureCategoriaExists(id);
    const data: Prisma.CategoriaUpdateInput = {}

    if(updateCategoriaDto.hasOwnProperty('cat_nome')){
      const hasName = await this.prismaService.categoria.findFirst({ where: { cat_nome: updateCategoriaDto.cat_nome, cat_id: {not:id}} })
      if(hasName) throw new BadRequestException('Nome já cadastrado!')
    }

    return await this.prismaService.categoria.update({
      data: {...updateCategoriaDto},
      where: { cat_id: id }
    });
  }

  async remove(id: number) {
    const categoria = await this.ensureCategoriaExists(id);
    const data = await this.prismaService.categoria.delete({ where: { cat_id: id }})
    return {
      id: categoria.cat_id,
      message: "Categoria deletada com sucesso",
      statusCode: HttpStatus.OK
    }
  }

  private async ensureCategoriaExists(id: number) {
    const categoria = await this.prismaService.categoria.findUnique({
      where: {  cat_id: id },
      select: {
        cat_id: true,
        cat_nome: true
      }
    });
    if (!categoria) throw new NotFoundException('Categoria não encontrada.');
    return categoria;
  }
}
