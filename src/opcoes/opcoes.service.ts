import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateOpcaoDto } from './dto/update-opcao.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOpcaoDto } from './dto/create-opcao.dto';

@Injectable()
export class OpcoesService {

  constructor(private prismaService: PrismaService){}

  async create(opcaoDto: CreateOpcaoDto[]) {
    const hasOpcao = opcaoDto.map( (opcao => {
      this.prismaService.opcao.findFirst({
        where: { 
          prodt_id: opcao.prodt_id,
          opc_nome: opcao.opc_nome,
        }
      })
    }))

    if(hasOpcao) throw new BadRequestException("Opção já cadastrada")

    const data = opcaoDto.map( opcao => ({
      opc_nome: opcao.opc_nome,
      opc_valores: JSON.stringify(opcao.opc_valores),
      prodt_id: opcao.prodt_id
    }))

    const opcao = await this.prismaService.opcao.createMany({ data })
    
    return {
      opcao,
      message: "Opções criadas com sucesso.",
      statusCode: HttpStatus.CREATED,
    }    
  }

  async findAll() {
    return await this.prismaService.opcao.findMany();
  }

  async findOne(id: number) {
    const opcao = await this.ensureOpcaoExist(id);
    return {
      opcao,
      statusCode: HttpStatus.OK
    }
  }

  async update(id: number, updateOpcoeDto: UpdateOpcaoDto) {
    await this.ensureOpcaoExist(id);

    const opcao = await this.prismaService.opcao.update({
      data: {
        opc_nome: updateOpcoeDto.opc_nome,
        opc_valores : JSON.stringify(updateOpcoeDto.opc_valores),
      },
      where: { opc_id: id}
    })
    return {
      opcao,
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    await this.ensureOpcaoExist(id);
    const opcao = await this.prismaService.opcao.delete({
      where: {opc_id : id}
    })
    return {
      id: opcao.opc_id,
      message: "Opção deletada com sucesso.",
      statusCode: HttpStatus.NO_CONTENT
    }
  }

  async ensureOpcaoExist(id: number){
    const opcao = await this.prismaService.opcao.findUnique({
      where: { opc_id: id }
    })
    if(!opcao) throw new BadRequestException("Opção não encontrada");
    else return opcao;
  }

}
