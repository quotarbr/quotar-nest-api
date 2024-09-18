import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateOpcaoDto } from './dto/update-opcao.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOpcaoDto } from './dto/create-opcao.dto';
import { Prisma } from '@prisma/client';
import { FiltrarOpcaoDto } from './dto/filtrar-opcao.dto';

@Injectable()
export class OpcoesService {

  constructor(private prismaService: PrismaService){}

  async create(createOpcaoDto: CreateOpcaoDto[]) {

    createOpcaoDto.forEach( async (op) => {
      const hasOpcao = await this.prismaService.opcao.findFirst({ 
          where: { 
            opc_nome: op.opc_nome,
            prodt_id: op.prodt_id
          } 
      });
      if(hasOpcao) throw new BadRequestException("Opção já cadastrada!");

      const hasProduto = await this.prismaService.produto.findUnique({ where: { prodt_id: op.prodt_id } });
      if(!hasProduto) throw new BadRequestException("Produto não encontrado!");
    });

    const data: Prisma.OpcaoCreateInput[] = createOpcaoDto.map( opcao => ({
      opc_nome: opcao.opc_nome,
      opc_valores: opcao.opc_valores,
      prodt_id: opcao.prodt_id
    }));

    const createdOpcoes = await Promise.all(
      data.map( async (opcaoData) => {
        return await this.prismaService.opcao.create({data: opcaoData})
      })
    )

    const createdIds = createdOpcoes.map(opcao => opcao.opc_id);
    
    return {
      ids: createdIds,
      message: "Opções criadas com sucesso!",
      statusCode: HttpStatus.CREATED,
    }    
  }

  async findAll(params?: FiltrarOpcaoDto) {
    const whereClause: Prisma.OpcaoWhereInput = {}

    if(params?.string){
      whereClause.OR = [
        {opc_id: +params.string || 0},
        {opc_nome: params.string.trim()},
        {opc_valores: JSON.parse(params.string.trim())}
      ]
    }

    const pagina  = ( +params?.pagina || 1 );
    const limite  = ( +params?.limite || 10 );
    const skip    = ( pagina - 1 * limite );
    const take    = ( limite );

    const opcoes = await this.prismaService.opcao.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: {opc_id: 'desc'},
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

    const total = await this.prismaService.opcao.count({where: whereClause});

    return {
      statusCode: HttpStatus.OK,
      paginas: Math.ceil( total / limite ),
      pagina,
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

  async update(id: number, updateOpcoeDto: UpdateOpcaoDto) {
    await this.ensureOpcaoExist(id);

    if(updateOpcoeDto.hasOwnProperty('opc_nome')){
      const hasNome = await this.prismaService.opcao.findFirst({ 
        where: {
          opc_nome: updateOpcoeDto.opc_nome.trim(), 
          prodt_id: updateOpcoeDto.prodt_id 
        } 
      });
      if(hasNome) throw new BadRequestException("Nome já cadastrado!");
    }

    if(updateOpcoeDto.hasOwnProperty('prodt_id')){
      const hasProduto = await this.prismaService.produto.findUnique({ where: { prodt_id: updateOpcoeDto.prodt_id } });
      if(!hasProduto) throw new BadRequestException("Produto não encontrado!");
    }

    const opcao = await this.prismaService.opcao.update({
      data: {
        ...updateOpcoeDto,
        opc_valores : JSON.stringify(updateOpcoeDto.opc_valores),
      },
      where: { opc_id: id}
    })
    return {
      id: opcao.opc_id,
      message: 'Opção atualizada com sucesso.',
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

  async ensureOpcaoExist(id: number){
    const opcao = await this.prismaService.opcao.findUnique({ 
      where: { 
        opc_id: id 
      },
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
