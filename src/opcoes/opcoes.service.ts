import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateOpcaoDto } from './dto/update-opcao.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOpcaoDto } from './dto/create-opcao.dto';
import { Opcao, Prisma } from '@prisma/client';
import { FiltrarOpcaoDto } from './dto/filtrar-opcao.dto';
import { VariantesService } from 'src/variantes/variantes.service';

@Injectable()
export class OpcoesService {

  constructor(
    private prismaService: PrismaService,
    private varianteService: VariantesService
  ){}

  async create(createOpcaoDto: CreateOpcaoDto) {

    // const { prodt_id } = createOpcaoDto;
    // const { opcoes } = createOpcaoDto;
    
    // for(const op of opcoes){
    //   const hasOpcao = await this.prismaService.opcao.findFirst({ 
    //     where: { 
    //       opc_nome: op.opc_nome,
    //       prodt_id
    //     } 
    //   });
    //   if(hasOpcao) throw new BadRequestException("Opção já cadastrada!");
    // }

    // const hasProduto = await this.prismaService.produto.findUnique({ where: { prodt_id } });
    // if(!hasProduto) throw new BadRequestException("Produto não encontrado!");


    // let opcoesList:Opcao[] = [];
    // for( const op of opcoes){
    //   const data: Prisma.OpcaoCreateInput = {
    //     opc_nome: op.opc_nome,
    //     opc_valores: op.opc_valores,
    //     produtos: {connect: {prodt_id}}
    //   }

    //   const opcao = await this.prismaService.opcao.create({data: data});
    //   opcoesList.push(opcao);
    // }
    

    // return {
    //   id_opcoes: opcoesList.map( (op) => op.opc_id),
    //   message: "Opções criadas com sucesso!",
    //   statusCode: HttpStatus.OK,
    // }    

    const mockOpcoes: Opcao[] = [
      {
        opc_id: 1,
        opc_nome: 'Cor',
        opc_valores: ['Vermelho', 'Azul', 'Verde'],
        prodt_id: 1
      },
      {
        opc_id: 2,
        opc_nome: 'Tamanho',
        opc_valores: ['P', 'M', 'G'],
        prodt_id: 1
      }
    ]

    this.varianteService.handleOpcoesToVariante(mockOpcoes);

  }

  async findAll(params?: FiltrarOpcaoDto) {
    const whereClause: Prisma.OpcaoWhereInput = {}

    if(params?.string){
      whereClause.OR = [
        {opc_id: +params.string || 0},
        {opc_nome: {contains: params.string.trim()}},
        {opc_valores: {array_contains: params.string.trim().toLowerCase()}},
        {opc_valores: {array_contains: params.string.trim().toUpperCase()}}
      ]
    }

    if(params?.prodt_ids){
      for( const id of params.prodt_ids){
        const hasProduto = await this.prismaService.produto.findFirst({ where: { prodt_id: +id } })
        if(!hasProduto) throw new BadRequestException("Produto não existe.");
      }

      whereClause.prodt_id = { in: params.prodt_ids.map( id => +id) }
    }
    

    const pagina  = ( +params?.pagina || 1 );
    const limite  = ( +params?.limite || 10 );
    const skip    = ( pagina - 1 ) * limite ;
    const take    = limite;

    const opcoes = await this.prismaService.opcao.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: {opc_id: 'desc'},
      select: {
        opc_id: true,
        opc_nome: true,
        opc_valores: true,
        prodt_id: true,
      }
    });

    const total = await this.prismaService.opcao.count({where: whereClause});

    return {
      statusCode: HttpStatus.OK,
      pagina,
      total_paginas: Math.floor( total / limite ),
      limite,
      total,
      total_resultados: opcoes.length,
      resultados: opcoes
    }
  }

  async findOne(id: number) {
    const data = await this.ensureOpcaoExist(id);
    return {
      statusCode: HttpStatus.OK,
      resultado: data
    }
  }

  async update(updateOpcoeDto: UpdateOpcaoDto) {
    
    const {opcoes} = updateOpcoeDto;

    if(updateOpcoeDto.hasOwnProperty('prodt_id')){
      const hasProduto = await this.prismaService.produto.findUnique({ where: { prodt_id: updateOpcoeDto.prodt_id } });
      if(!hasProduto) throw new BadRequestException("Produto não encontrado!");
    }

    for(const op of opcoes){
      const oldOpcao = await this.ensureOpcaoExist(op.opc_id, updateOpcoeDto.prodt_id);

      const hasNome = await this.prismaService.opcao.findFirst({ 
        where: {
          opc_nome: op.opc_nome, 
          prodt_id: updateOpcoeDto.prodt_id,
          opc_id: {not: op.opc_id || oldOpcao.opc_id}

        } 
      });

      if(hasNome) {
        throw new BadRequestException("Nome já cadastrado!");
      } 
    }

    for(const op of opcoes){
      await this.prismaService.opcao.update({
        data: op,
        where: {
          opc_id: op.opc_id
        }
      })
    }

    return {
      ids: opcoes.map( (op) => op.opc_id),
      message: 'Opções atualizadas com sucesso.',
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    await this.ensureOpcaoExist(id);
    const opcao = await this.prismaService.opcao.delete({ where: {opc_id : id} });
    return {
      id: opcao.opc_id,
      message: "Opção deletada com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  async ensureOpcaoExist(id: number, prodt_id?: number){
    const whereClause: Prisma.OpcaoWhereUniqueInput = { opc_id: id }

    if(prodt_id){
      whereClause.prodt_id = prodt_id
    }

    const opcao = await this.prismaService.opcao.findUnique({ 
      where: whereClause,
      select: {
        opc_id: true,
        opc_nome: true,
        opc_valores: true,
        produtos: {
         select: {
          prodt_id: true,
          prodt_nome: true,
          prodt_status: true,
          loj_id: true
         } 
        }
      } 
    });
    if(!opcao) throw new BadRequestException("Opção não encontrada!");
    return opcao;
  }

}
