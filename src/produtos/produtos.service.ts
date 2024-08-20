import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, PRODT_STATUS } from '@prisma/client';
import { OpcoesService } from 'src/opcoes/opcoes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { VariantesService } from 'src/variantes/variantes.service';
import { FotoDto } from './dto/foto.dto';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { FiltrosDto } from './dto/filtros-produto.dto';

@Injectable()
export class ProdutosService {

  constructor(
    private prismaService: PrismaService,
    private opcoesService: OpcoesService,
    private varianteService: VariantesService
  ){}

  async create(createProdutoDto: CreateProdutoDto) {    
    const hasProduto = await this.prismaService.produto.findFirst({
      where: {
        prodt_nome: createProdutoDto.prodt_nome,
        loj_id: createProdutoDto.prodt_loja
      }
    })

    if (hasProduto) throw new BadRequestException("Produto já cadastrado.");

    const data = {
      prodt_fotos: await this.uploadFotos(createProdutoDto.prodt_fotos),
      prodt_nome: createProdutoDto.prodt_nome,
      prodt_descricao: createProdutoDto.prodt_descricao,
      loj_id: createProdutoDto.prodt_loja,
      tp_id: createProdutoDto.prodt_tipo,
      prodt_status: await this.escolheStatus("liberacao")
    }

    const produto = await this.prismaService.produto.create({ data });

    return {
      id: produto.prodt_id,
      message: "Produto criado com sucesso.",
      statusCode: HttpStatus.CREATED
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

    // if(filtros.string){
    //   whereClause.OR = {
    //     lojas : {
    //       some: {
    //         loj_nome: { contains: filtros.string }
    //       }
    //     },
    //     opcoes :{
    //       some:{
    //         opc_nome: { contains: filtros.string }
    //       }
    //     },
    //     prodt_nome:  { contains: filtros.string }
    //     prodt_descricao:  { contains: filtros.string }
    //   }
    // }
    
    return await this.prismaService.produto.findMany({
      where: whereClause,
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
        }
      }
    });
  }

  async findOne(id: number) {
    const produto = await this.ensureProdutoExist(id);
    return {
      data: produto,
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
            vrnt_opcoes: true,
            tipos_precos: {
              select: {
                tp_prec_id: true,
                tp_prec_nome: true
              }
            }
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
