import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PRODT_STATUS } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FotoDto } from './dto/foto.dto';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { FiltrosDto } from './dto/filtros-produto.dto';

@Injectable()
export class ProdutosService {

  constructor(
    private prismaService: PrismaService
  ){}

  async create(createProdutoDto: CreateProdutoDto) {    
    const hasProduto = await this.prismaService.produto.findFirst({
      where: {
        prodt_nome: createProdutoDto.prodt_nome,
        loj_id: createProdutoDto.loj_id
      }
    })

    if (hasProduto) throw new BadRequestException("Produto já cadastrado!");

    const hasLoja = await this.prismaService.loja.findFirst({
      where: {
        loj_id: createProdutoDto.loj_id
      }
    })

    if (!hasLoja) throw new NotFoundException("Loja não encontrada!");

    const hasTIpo = await this.prismaService.tipo.findFirst({
      where: {
        tp_id: createProdutoDto.tp_id
      }
    })

    if (!hasTIpo) throw new NotFoundException("Tipo não encontrado!");

    const tipoPreco = await this.prismaService.tipos_preco.create({ 
      data :{
        tp_prec_nome: createProdutoDto.tp_prec_nome
      }
    });

    const data: Prisma.ProdutoCreateInput = {
      prodt_fotos: await this.uploadFotos(createProdutoDto.prodt_fotos),
      prodt_nome: createProdutoDto.prodt_nome,
      prodt_descricao: createProdutoDto.prodt_descricao,
      lojas: { connect: { loj_id: createProdutoDto.loj_id } },
      tipos: { connect: { tp_id: createProdutoDto.tp_id } },
      tipos_precos: { connect: { tp_prec_id: tipoPreco.tp_prec_id }},
      prodt_status: PRODT_STATUS.liberacao,
      
    }

    const produto = await this.prismaService.produto.create({ data });

    
    await this.prismaService.variante.create({ 
      data:{
        vrnt_preco: 0,
        vrnt_fotos: "[]",
        vrnt_opcoes: "[]",
        produtos:{ connect : { prodt_id: produto.prodt_id} },
      } 
    });

    return {
      id: produto.prodt_id,
      message: "Produto criado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  async findAll(filtros?: FiltrosDto) {
    const whereClause: Prisma.ProdutoWhereInput = {}

    if(filtros?.tipo){
      whereClause.tp_id = filtros?.tipo
    }
    if(filtros?.loja){
      whereClause.loj_id = filtros?.loja
    }

    if(filtros?.opcao){
      whereClause.opcoes = {
        some:{
          opc_id: +filtros?.opcao
        }
      }
    }

    if(filtros?.string){
      // const lojaIds = (await this.lojasService.findByNome(filtros?.string)).map(loja => loja.loj_id);

      whereClause.OR = [
        // {loj_id:{ in: lojaIds }},
        {opcoes:{ some:{ opc_nome: { contains: filtros?.string.trim()}}}},
        {prodt_nome:{ contains: filtros?.string.trim() }},
        {prodt_descricao:{ contains: filtros?.string.trim() }},
        {tipos: {tp_nome: { contains: filtros?.string.trim() }}},
        {tipos: {categorias: {cat_nome: {contains: filtros?.string.trim()}}}}
      ]
    }
    
    const resultados = await this.prismaService.produto.findMany({
      where: whereClause,
      take: filtros?.limit,
      select: {
        prodt_id: true,
        prodt_fotos: true,
        prodt_nome: true,
        tipos: {
          select: {
            tp_nome: true,
            categorias: {
              select: {
                cat_nome:true
              }
            }
          }
        },
        opcoes: {
          select: {
            opc_nome: true,
            opc_valores: true
          }
        },
      }
    });

    const totalProdutos = await this.prismaService.produto.count({
      where: whereClause
    })

    return {
      statusCode: HttpStatus.OK,
      resultados,
      total: totalProdutos
    }
  }

  async findOne(id: number) {
    const produto = await this.ensureProdutoExist(id);
    return {
      resultado: produto,
      statusCode: HttpStatus.OK
    }
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    this.ensureProdutoExist(id);

    const produto = this.prismaService.produto.update({
      data: {
        ...updateProdutoDto,
        prodt_fotos: await this.uploadFotos(updateProdutoDto.prodt_fotos),
        prodt_status: await this.escolheStatus(updateProdutoDto.prodt_status)
          
      },
      where: { prodt_id: id }
    })

    return {
      produto,
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    const produto = await this.ensureProdutoExist(id);
    
    this.prismaService.produto.delete({
      where: { prodt_id: id}
    })
    return {
      id: produto.prodt_id,
      message: 'Produto deletado com sucesso.',
      statusCode: HttpStatus.NO_CONTENT
    }
  }

  private async ensureProdutoExist(id: number){
    const produto = await this.prismaService.produto.findUnique({
      where: { 
        prodt_id: id
      },
      include: {
        variantes: {
          select: {
            prodt_id: true,
            vrnt_fotos: true,
            vrnt_preco: true,
            vrnt_opcoes: true
          }
        }
      }
    })
    if(!produto) throw new BadRequestException("Produto não encontrado");
    else return produto;
  }

  private async escolheStatus(status : string){
    return status == "liberacao" ? PRODT_STATUS.liberacao : status == "ativo" 
      ? PRODT_STATUS.ativo : PRODT_STATUS.inativo  
  } 

  private async uploadFotos(prodt_fotos : FotoDto[]){
    //tratar de base64 para string ?? o que vai ser e como
    const fotosTratadas = []
    return JSON.stringify(fotosTratadas);  
  }   
}
