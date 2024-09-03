import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpcaoValor } from './dto/opcao-valor.dto';

@Injectable()
export class VariantesService {
  constructor(
    private prismaService: PrismaService
  ){}

  async create(createVarianteDto: CreateVarianteDto[]) {
    const opcoes = createVarianteDto.map((vr) => vr.vrnt_opcoes).flat();
    await this.ensureOpcoeExist(opcoes);

    const data =  createVarianteDto.map( variante => ({
      vrnt_fotos: JSON.stringify(variante.vrnt_fotos),
      vrnt_preco: variante.vrnt_preco,
      vrnt_opcoes: JSON.stringify(variante.vrnt_opcoes),
      prodt_id: variante.prodt_id
    }))

    const createdVariantes = await Promise.all(
      data.map( async (variante) => { 
        return await this.prismaService.variante.create({data: variante})
      })
    )

    return {
      createdVariantes,
      message: "Variante(s) criada com sucesso",
      statusCode: HttpStatus.CREATED
    }
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
        vrnt_opcoes:  JSON.stringify(updateVarianteDto.vrnt_opcoes)
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

  async ensureOpcoeExist(opcoesValor: OpcaoValor[]) {
    for (const op of opcoesValor) {
      
      const opcao = await this.prismaService.opcao.findUnique({
        where: { opc_id: op.opc_id }
      });

      if(opcao){
        const ensureNomeOpc = opcao.opc_nome == op.opc_nome;
        const ensureValorOpc = true //opcao.opc_valores.(op.opc_valor);

        // if (ensureNomeOpc === false || ensureValorOpc === false) {
        //   throw new BadRequestException("Nome ou valor difere da opcão cadastrada para o produto.");
        // } 
      } else {
          throw new BadRequestException("Opção não encontrada.");
      }
    }
    return true;
  }
}
