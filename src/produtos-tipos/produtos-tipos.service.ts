import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
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

  findAll(params?: FiltrarProdutoTipoDto) {
    const whereClause: Prisma.ProdutoTipoWhereInput = {};
    return `This action returns all produtosTipos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produtosTipo`;
  }

  update(id: number, updateProdutosTipoDto: UpdateProdutosTipoDto) {
    return `This action updates a #${id} produtosTipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} produtosTipo`;
  }
}
