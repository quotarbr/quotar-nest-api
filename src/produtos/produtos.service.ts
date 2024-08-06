import { BadRequestException, HttpStatus, Injectable, Response } from '@nestjs/common';
import { ReqProdutoDto } from './dto/req-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PRODT_STATUS, Prisma } from '@prisma/client';
import { FotoDto } from './dto/foto.dto';
import { OpcoesService } from 'src/opcoes/opcoes.service';
import { CategoriasService } from 'src/categorias/categorias.service';
import { TiposService } from 'src/tipos/tipos.service';
import { LojasService } from 'src/lojas/lojas.service';
import { TiposPrecosService } from 'src/tipos_precos/tipos_precos.service';
import { VariantesService } from 'src/variantes/variantes.service';

@Injectable()
export class ProdutosService {

  constructor(
    private prismaService: PrismaService,
    private opcoesService: OpcoesService,
    private varianteService: VariantesService
  ){}

  async create(reqProdutoDto: ReqProdutoDto) {    
    const data = {
      prodt_fotos: await this.uploadFotos(reqProdutoDto.prodt_fotos),
      prodt_nome: reqProdutoDto.prodt_nome,
      prodt_descricao: reqProdutoDto.prodt_descricao,
      loj_id: reqProdutoDto.prodt_loja,
      tp_id: reqProdutoDto.prodt_tipo,
      prodt_status: PRODT_STATUS.liberacao
    }

    const produto = await this.prismaService.produto.create({ data });

    const opcao = reqProdutoDto.prodt_opcoes.map( op => ({
      opc_nome: op.opc_nome,
      opc_valores: JSON.stringify(op.opc_valores),
      prodt_id: produto.prodt_id
    }))

    await this.opcoesService.create(opcao);

    


    return 'Produto criado com sucesso'
  }

  async findAll() {
    return await this.prismaService.produto.findMany();
  }

  async findOne(id: number) {
    const produto = this.prismaService.produto.findUnique({
      where: { prodt_id: id}
    })

    if(!produto) throw new BadRequestException("Produto não encontrado.");

    return {
      data: produto,
      statusCode: HttpStatus.OK
    }
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  async remove(id: number) {
    return `This action removes a #${id} produto`;
  }

  async uploadFotos(prodt_fotos : FotoDto[]){
    //tratar de base64 para string ?? o que vai ser e como
    const fotosTratadas = []
    return JSON.stringify(fotosTratadas);  
  } 
}
