import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PRODT_STATUS } from '@prisma/client';
import { CreateOpcaoDto } from 'src/opcoes/dto/create-opcao.dto';
import { OpcoesService } from 'src/opcoes/opcoes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { VariantesService } from 'src/variantes/variantes.service';
import { FotoDto } from './dto/foto.dto';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';


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

  async findAll() {
    return await this.prismaService.produto.findMany({
      select: {
        prodt_id: true,
        prodt_fotos: true,
        lojas: {
          select:{
            loj_id: true,
            loj_nome: true,
          }
        },
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
          //jogar tipo para fora
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
