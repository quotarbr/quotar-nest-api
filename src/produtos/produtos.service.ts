import { BadRequestException, Injectable, Response } from '@nestjs/common';
import { ReqProdutoDto } from './dto/req-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FotoDto } from './dto/foto.dto';
import { OpcoesService } from 'src/opcoes/opcoes.service';
import { OpcaoDto } from 'src/opcoes/dto/opcao.dto';
import { CategoriasService } from 'src/categorias/categorias.service';
import { TiposService } from 'src/tipos/tipos.service';

@Injectable()
export class ProdutosService {

  constructor(
    private prismaService: PrismaService,
    private categoriasService: CategoriasService,
    private tipoService: TiposService,
    private opcoesService: OpcoesService
  ){}

  async create(reqProdutoDto: ReqProdutoDto) {    
    //categoria
    const categoria = this.categoriasService.create(reqProdutoDto.prodt_categoria);
    //tipo
    const tipo = this.tipoService.create(reqProdutoDto.prodt_tipo);
    //estado
    //cidade
    //bairro

    //opcoes
    
    //tipos_preco
    
    
    
    //produto
    const data: Prisma.ProdutoUncheckedCreateInput = {
      prodt_fotos: await this.uploadFotos(reqProdutoDto.prodt_fotos),
      prodt_nome: reqProdutoDto.prodt_nome,
      prodt_descricao: reqProdutoDto.prodt_descricao,
      // loj_id: , // A api que vai autenticar 
      tp_id: reqProdutoDto.prodt_tipo.tp_ip,
    };
    await this.prismaService.produto.create({ data });
    

    // this.opcoesService.create(reqProdutoDto.prodt_opcoes, produto.prodt_id );
    return 'Produto criado com sucesso'
  }

  findAll() {
    
    return this.prismaService.produto.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }

  async uploadFotos(prodt_fotos : FotoDto[]){
    //tratar de base64 para string ?? o que vai ser e como
    const fotosTratadas = []
    return JSON.stringify(fotosTratadas)  
  } 
}
