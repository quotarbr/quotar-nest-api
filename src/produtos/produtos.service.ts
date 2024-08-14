import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PRODT_STATUS } from '@prisma/client';
import { CreateOpcaoDto } from 'src/opcoes/dto/create-opcao.dto';
import { OpcoesService } from 'src/opcoes/opcoes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { VariantesService } from 'src/variantes/variantes.service';
import { FotoDto } from './dto/foto.dto';
import { ReqProdutoDto } from './dto/req-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';


@Injectable()
export class ProdutosService {

  constructor(
    private prismaService: PrismaService,
    private opcoesService: OpcoesService,
    private varianteService: VariantesService
  ){}

  async create(reqProdutoDto: ReqProdutoDto) {    
    const hasProduto = await this.prismaService.produto.findFirst({
      where: {
        prodt_nome:  reqProdutoDto.prodt_nome,
        loj_id: reqProdutoDto.prodt_loja
      }
    })

    if (hasProduto) throw new BadRequestException("Produto já cadastrado.");

    const data = {
      prodt_fotos: await this.uploadFotos(reqProdutoDto.prodt_fotos),
      prodt_nome: reqProdutoDto.prodt_nome,
      prodt_descricao: reqProdutoDto.prodt_descricao,
      loj_id: reqProdutoDto.prodt_loja,
      tp_id: reqProdutoDto.prodt_tipo,
      prodt_status: PRODT_STATUS.liberacao
    }

    const produto = await this.prismaService.produto.create({ data });

    const opcoesData: CreateOpcaoDto[] = reqProdutoDto.prodt_opcoes.map( op => ({
      opc_nome: op.opc_nome,
      opc_valores: JSON.stringify(op.opc_valores),
      prodt_id: produto.prodt_id    
    }))

    await this.opcoesService.create(opcoesData);
    
    const variantes = reqProdutoDto.prodt_variants.map( vr => ({
      vrnt_fotos: vr.vrnt_fotos,
      vrnt_preco: vr.vrnt_preco,
      vrnt_opcoes: vr.vrnt_opcoes,
      prodt_id: produto.prodt_id,
      tp_prec_id: vr.tp_prec_id
    }))

    await this.varianteService.create(variantes); 

    return {
      produto,
      variantes,
      message: "Produto criado com sucesso.",
      statusCode: HttpStatus.CREATED
    }
  }

  async findAll() {
    return await this.prismaService.produto.findMany();
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
