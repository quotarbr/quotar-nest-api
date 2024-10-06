import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoTipoDto } from './dto/create-produtos-tipo.dto';
import { UpdateProdutosTipoDto } from './dto/update-produtos-tipo.dto';
import { FiltrarProdutoTipoDto } from './dto/filtrar-produto-tipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProdutosTiposService {

  constructor(
    private prismaService: PrismaService
  ){}

  async create(createProdutosTipoDto: CreateProdutoTipoDto) {
    const { prod_id, tp_id } = createProdutosTipoDto;
    const hasProdutoTipo = await this.prismaService.produtoTipo.findFirst({
      where: {
        AND: [
          { prod_id: prod_id },
          { tp_id: tp_id}
        ]
      }
    })
    if(hasProdutoTipo) throw new BadRequestException("Associação já cadastrada.");

    const data: Prisma.ProdutoTipoCreateInput = {
      produto: { connect: { prodt_id: createProdutosTipoDto.prod_id }},
      tipo: { connect: {tp_id: createProdutosTipoDto.tp_id}}
    }
    const produtoTipo = await this.prismaService.produtoTipo.create({data});
    return {
      id_produto: produtoTipo.prod_id,
      id_tipo: produtoTipo.tp_id,
      message: "Lojista cadastrado com sucesso!",
      statusCode: HttpStatus.OK
    }
  }

  async findAll(params?: FiltrarProdutoTipoDto) {
    const whereClause: Prisma.ProdutoTipoWhereInput = {};

    if(params?.prod_id) whereClause.prod_id = +params.prod_id;
    if(params?.tp_id) whereClause.tp_id = +params.tp_id;

    const pagina  = ( +params?.pagina || 1 );
    const limite  = ( +params?.limite || 10 );
    const skip    = ( pagina - 1 ) * limite ;
    const take    = limite;

    const produtosTipos = await this.prismaService.produtoTipo.findMany({
      where: whereClause,
      take,
      skip,
      orderBy: {tp_id: 'desc'},
      select: {
        prod_id: true,
        tp_id: true
      }
    })

    const total = await this.prismaService.produtoTipo.count({where: whereClause});

    return {
      statusCode: HttpStatus.OK,
      paginas: Math.floor( total / limite ),
      pagina,
      limite,
      total,
      total_resultados: produtosTipos.length,
      resultados: produtosTipos
    }
  }

  async findOne(prodId: number, tpId: number) {
    const data = await this.ensureProdutoTipoExist(prodId, tpId);
    return {
      statusCode: HttpStatus.OK,
      resultado: data
    }
  }

  async update(prodId: number, tpId: number, updateProdutosTipoDto: UpdateProdutosTipoDto) {
    const oldProdutoTipo = await this.ensureProdutoTipoExist(prodId, tpId);

    if (updateProdutosTipoDto.hasOwnProperty('prod_id') || updateProdutosTipoDto.hasOwnProperty('tp_id')) {
      const existingProdutoTipo = await this.prismaService.produtoTipo.findFirst({
        where: {
          prod_id: updateProdutosTipoDto.prod_id || oldProdutoTipo.prod_id,  
          tp_id: updateProdutosTipoDto.tp_id || oldProdutoTipo.tp_id,        
          NOT: {
            prod_id: prodId, 
            tp_id: tpId,
          },
        },
      });
  
      if (existingProdutoTipo) {
        throw new BadRequestException('A associação já existe!');
      }
    }
    const produtoTipo = await this.prismaService.produtoTipo.update({
      data: {...updateProdutosTipoDto},
      where: {
        prod_id_tp_id: {
          prod_id: prodId,
          tp_id: tpId
        }
      }
    })

    return {
      prodId: produtoTipo.prod_id,
      tpId: produtoTipo.tp_id,
      message: "Associação atualizada com sucesso!",
      statusCode: HttpStatus.OK
    }
  }

  async remove(prodId: number, tpId: number) {
    const produtosTipo = await this.ensureProdutoTipoExist(prodId, tpId);
    await this.prismaService.produtoTipo.delete({
      where: {
        prod_id_tp_id: {
          prod_id: prodId,
          tp_id: tpId
        }
      }
    });
    return {
      prodId: produtosTipo.prod_id,
      tpId: produtosTipo.tp_id,
      message: "Lojista deletado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  async ensureProdutoTipoExist(prodId:number, tpId:number) {
    const produtoTipo = await this.prismaService.produtoTipo.findUnique({
      where: {
        prod_id_tp_id: {
          prod_id: prodId,
          tp_id: tpId
        }
      },
      select: {
        prod_id: true,
        tp_id: true
      }
    })
    if(!produtoTipo)throw new NotFoundException('Associação não encontrada.');
    return produtoTipo;
  }
}
