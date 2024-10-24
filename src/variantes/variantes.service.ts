import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpcaoValor } from './dto/opcao-valor.dto';
import { Opcao, Prisma, Variante } from '@prisma/client';
import { CategoriasController } from 'src/categorias/categorias.controller';
import { arrayContains } from 'class-validator';

@Injectable()
export class VariantesService {
  constructor(
    private prismaService: PrismaService
  ){}

  async create(createVarianteDto: CreateVarianteDto[]) {
    
    for ( const variante of createVarianteDto ) {
      const hasProduto = await this.prismaService.produto.findFirst({where: {prodt_id: variante.prodt_id }});
      if(!hasProduto) throw new BadRequestException("Produto não cadastrado.");

      const hasTipoPreco = await this.prismaService.tipos_preco.findFirst({where: {tp_prec_id: variante.tp_prec_id}});
      if(!hasTipoPreco) throw new BadRequestException("Tipo de preço não cadastrado.");
    }

    
    await this.ensureOpcoeExist(createVarianteDto);
  
    let varianteList: Variante[] = [];
    // for( const variante of createVarianteDto){
    //   const data: Prisma.VarianteCreateInput = {
    //     vrnt_fotos: variante.vrnt_fotos,
    //     vrnt_preco: variante.vrnt_preco,
    //     produto: { connect: { }}

    //   }

    //   console.log(data)
    // }


    return 

    // const createdVariantes = await Promise.all(
    //   data.map( async (variante) => { 
    //     return await this.prismaService.variante.create({data: variante})
    //   })
    // )

    // return {
    //   createdVariantes,
    //   message: "Variante(s) criada com sucesso",
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
    
    const variante = await this.prismaService.variante.update({
      data: {
        vrnt_fotos:   JSON.stringify(updateVarianteDto.vrnt_fotos),
        vrnt_preco:   updateVarianteDto.vrnt_preco,
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

  async ensureOpcoeExist( createVarianteDto: CreateVarianteDto[]  ) {
    const opcoesList   : OpcaoValor[] = createVarianteDto.map( variante => variante.vrnt_opcoes ).flat();
    for ( const variante of createVarianteDto ) {
      for(const opc of opcoesList){
        const hasOpcao = await this.prismaService.opcao.findFirst({ where: { opc_id: opc.opc_id, prodt_id: variante.prodt_id } }) 
        if(!hasOpcao) throw new BadRequestException(`Opcão não cadastrada no produto ${variante.prodt_id}.`);
    

        const hasValorOpc = await this.prismaService.opcao.findFirst({
          where: { 
            opc_valores: {array_contains: opc.opc_valor.trim()  },
            prodt_id: variante.prodt_id, opc_nome: opc.opc_nome 
          }
        });
        if(!hasValorOpc) throw new BadRequestException(`Valor ${opc.opc_valor.trim()} não cadastrado para ${opc.opc_nome}.`)

      }
    }
  }
}
