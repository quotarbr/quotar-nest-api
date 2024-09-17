import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Categoria, Prisma, TipoCategoria } from '@prisma/client';
import { FiltrarTipoDto } from './dto/filtrar-tipo.dto';
import { connect } from 'http2';

@Injectable()
export class TiposService {
  constructor(private prismaService: PrismaService){}

  async create(createTipoDto: CreateTipoDto) {
    const { tp_nome, categorias } = createTipoDto;
    
    const hasTipo = await this.prismaService.tipo.findFirst({ where: { tp_nome: createTipoDto.tp_nome } })
    if(hasTipo) throw new BadRequestException("Tipo já cadastrado.");

    const data: Prisma.TipoCreateInput = {
      tp_nome: tp_nome
    }

    const tipo = await this.prismaService.tipo.create({data});

    const hasCategoria = await Promise.all(
      categorias.map( (cat_id) => {
        this.prismaService.categoria.findFirst({
          where:{
            cat_id
          }
        })
      })
    );

    hasCategoria.forEach( (cat, i) => {
      if(cat == null){
        throw new BadRequestException(`Categoria ${categorias[i]} não encontrada`)
      }
    })

    let tipoCategoriaList: Prisma.TipoCategoriaCreateManyInput[] = categorias.map((cat_id) => {
      return {
        tp_id: tipo.tp_id,
        cat_id: cat_id
      }
    });

    await this.prismaService.tipoCategoria.createMany({data: tipoCategoriaList});
    
    return {
      id: tipo.tp_id,
      message: "Tipo cadastrado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  async findAll(params?: FiltrarTipoDto) {
    const whereClause: Prisma.TipoWhereInput = {}
    if(params?.string){
      whereClause.OR = [
        { tp_nome: { contains: params.string.trim() }},
        { tp_id: +params.string || 0 }
      ]
    }
    const pagina  = ( +params?.pagina || 1 );
    const limite  = ( +params?.limite || 10 );
    const skip    = ( pagina - 1 * limite );
    const take    = ( limite );

    const tipos = await this.prismaService.tipo.findMany({
      where: whereClause,
      take,
      skip,
      orderBy: { tp_id:'desc' },
      select: {
        tp_id: true,
        tp_nome: true,
        categorias: {
          select: {
            categoria: {
              select:{
                cat_id: true,
                cat_nome: true
              }
            }
          }
        }
      }
    });
    const total = await this.prismaService.tipo.count({where: whereClause});

    return {
      statusCode: HttpStatus.OK,
      paginas: Math.ceil( total / limite ),
      pagina,
      limite,
      total,
      total_resultados: tipos.length,
      resultados: tipos
    }
  }

  async findOne(id: number) {
    const tipo = this.ensureTipoExists(id);
    return {
      statusCode: HttpStatus.OK,
      resultado: tipo
    }
  }

  async update(id: number, updateTipoDto: UpdateTipoDto) {
    const {tp_nome, categorias} = updateTipoDto;

    const oldTipo = await this.ensureTipoExists(id);

    if(updateTipoDto.hasOwnProperty('tp_nome')){
      const hasNome = await this.prismaService.tipo.findFirst({
        where: { tp_nome: updateTipoDto.tp_nome, tp_id: {not: id} }
      })
      if(hasNome) throw new BadRequestException('Nome já cadastrado!');
    }

    const tipo = await this.prismaService.tipo.update({
      data: { tp_nome },
      where: {
        tp_id: oldTipo.tp_id
      }
    })

    //pegar as categorias, paraca cada cat, dar update 
    let tipoCategoriaList: Prisma.TipoCategoriaCreateManyInput[] = categorias.map((cat_id) => {
      return {
        tp_id: tipo.tp_id,
        cat_id: cat_id
      }
    });
    //atualizar a associacao de cada uma
    // await this.prismaService.tipoCategoria.updateMany({
    //   data: tipoCategoriaList,
    //   where: {

    //   }
    // })










    return {
      id: tipo.tp_id,
      message: "Tipo atualizado com sucesso!",
      statusCode: HttpStatus.OK
    }
    
  }

  async remove(id: number) {
    const tipo = await this.ensureTipoExists(id);
    await this.prismaService.tipo.delete({
      where: { tp_id: id}
    }) 
    return {
      id: tipo.tp_id,
      message: "Tipo deletado com sucesso.",
      statusCode: HttpStatus.OK 
    }
  }

  async ensureTipoExists(id: number){
    const tipo = await this.prismaService.tipo.findUnique({
      where: {
        tp_id: id
      },
      select: {
        tp_id: true,
        tp_nome: true,
        categorias: {
          select: {
            categoria: {
              select:{
                cat_id: true,
                cat_nome: true
              }
            }
          }
        }
      }
    });

    if(!tipo){ throw new NotFoundException('Tipo não encontrado.') };
    return tipo;
  }
}
