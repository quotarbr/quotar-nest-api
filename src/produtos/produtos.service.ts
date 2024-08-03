import { BadRequestException, HttpStatus, Injectable, Response } from '@nestjs/common';
import { ReqProdutoDto } from './dto/req-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
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
    private categoriasService: CategoriasService,
    private tiposService: TiposService,
    private lojasService: LojasService,
    private opcoesService: OpcoesService,
    private tiposPrecoService: TiposPrecosService,
    private varianteService: VariantesService
  ){}

  async create(reqProdutoDto: ReqProdutoDto) {    
    
    //categoria

    //tipo

    //loja
      //
    //produto
    //opcao
    //tipo_preco
    //variante
   
    

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
    return JSON.stringify(fotosTratadas)  
  } 
}
