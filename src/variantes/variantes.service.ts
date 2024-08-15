import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { STATUS_CODES } from 'http';
import { json } from 'stream/consumers';
import { OpcaoValor } from './dto/opcao-valor.dto';

@Injectable()
export class VariantesService {
  constructor(
    private prismaService: PrismaService
  ){}

  async create(createVarianteDto: CreateVarianteDto[]) {
    const opcoes = createVarianteDto.map((vr) => vr.vrnt_opcoes).flat();
    console.log(opcoes)
    await this.ensureOpcoeNotExist(opcoes);



    
    

    // const data =  createVarianteDto.map( variante => ({
    //   vrnt_fotos: JSON.stringify(variante.vrnt_fotos),
    //   vrnt_preco: variante.vrnt_preco,
    //   vrnt_opcoes: JSON.stringify(variante.vrnt_opcoes),
    //   prodt_id: variante.prodt_id,
    //   tp_prec_id: variante.tp_prec_id
    // }))

    // const variantes = await this.prismaService.variante.createMany({data});
    // //verificar se as opcoes existem fazer um for nelas

    // return {
    //   variantes,
    //   message: "Variante criada com sucesso",
    //   statusCode: HttpStatus.CREATED
    // }
  }

  async findAll() {
    return await this.prismaService.variante.findMany();
  }

  async findOne(id: number) {
    const variante = await this.ensureVarianteExist(id);
    return {
      variante,
      statusCode: HttpStatus.OK
    }
  }

  async update(id: number, updateVarianteDto: UpdateVarianteDto) {
    await this.ensureVarianteExist(id);
    const variante =await this.prismaService.variante.update({
      data: {
        vrnt_fotos:   JSON.stringify(updateVarianteDto.vrnt_fotos),
        vrnt_preco:   updateVarianteDto.vrnt_preco,
        vrnt_opcoes:  JSON.stringify(updateVarianteDto.vrnt_opcoes),
        tp_prec_id:   updateVarianteDto.tp_prec_id
      },
      where: { vrnt_id: id}
    })
    return {
      variante,
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    await this.ensureVarianteExist(id);
    const variante = await this.prismaService.variante.delete({
      where: { vrnt_id: id}
    })
    return {
      id: variante.vrnt_id,
      message: "Opção deletada com sucesso.",
      statusCode: HttpStatus.NO_CONTENT
    }
  }

  async ensureVarianteExist(id: number){
    const variante = await this.prismaService.variante.findUnique({
      where: { vrnt_id: id }
    })
    if(!variante) throw new BadRequestException("Variante não encontrada");
    else return variante;
  }

  async ensureOpcoeNotExist(opcoesValor: OpcaoValor[]) {
    for (const op of opcoesValor) {
      
      const opcao = await this.prismaService.opcao.findUnique({
        where: { opc_id: op.opc_id }
      });

  
      if (opcao && JSON.parse(opcao.opc_valores).includes(op.opc_valor)) {
        throw new BadRequestException("A opção com o valor especificado já existe.");
      }
    }
    return true;
  }
}
