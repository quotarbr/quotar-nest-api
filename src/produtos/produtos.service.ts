import { BadRequestException, Injectable, Response } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FotoDto } from './dto/foto.dto';

@Injectable()
export class ProdutosService {

  constructor(private prismaService: PrismaService){}

  async create(createProdutoDto: CreateProdutoDto) {    
    const data: Prisma.ProdutoUncheckedCreateInput = {
      prodt_fotos: await this.uploadFotos(createProdutoDto.prodt_fotos),
      prodt_nome: createProdutoDto.prodt_nome,
      prodt_descricao: createProdutoDto.prodt_descricao,
      // loj_id: , // A api que vai autenticar 
      tp_id: createProdutoDto.prodt_tipo.tp_ip
    };

    //criar tbm aqui as relacoes 
    //chamar a service de todas e salvar tbm 
    
    return this.prismaService.produto.create({ data })
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
    const fotosTratadas = []
    return JSON.stringify(fotosTratadas)  
  } 
}
