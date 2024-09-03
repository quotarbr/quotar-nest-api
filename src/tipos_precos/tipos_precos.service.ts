import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTiposPrecoDto } from './dto/create-tipos_preco.dto';
import { UpdateTiposPrecoDto } from './dto/update-tipos_preco.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TiposPrecosService {
  constructor(
    private prismaService: PrismaService
  ){}

  async create(createTiposPrecoDto: CreateTiposPrecoDto) {
    const hasTipoPreco = await this.prismaService.tipos_preco.findFirst({
      where: {
        tp_prec_nome: createTiposPrecoDto.tp_prec_nome
      }
    })
    if(hasTipoPreco) throw new NotFoundException("Tipo preço já cadastrado.");

    const data = { ...createTiposPrecoDto };
    const tipoPreco = await this.prismaService.tipos_preco.create({ data });
    
    return {
      id: tipoPreco.tp_prec_id,
      message: "Tipo preço cadastrado com sucesso.",
      statusCode: HttpStatus.CREATED
    };
  }

  async findAll() {
    return await this.prismaService.tipos_preco.findMany();
  }

  async findOne(id: number) {
    const tipoPreco = await this.ensureTipoPrecoExists(id);

    return {
      tipoPreco,
      statusCode: HttpStatus.OK
    };
  }

  async update(id: number, updateTiposPrecoDto: UpdateTiposPrecoDto) {
    await this.ensureTipoPrecoExists(id);

    const tipoPreco =  await this.prismaService.tipos_preco.update({
      data: updateTiposPrecoDto,
      where: { tp_prec_id: id }
    })

    return {
      tipoPreco,
      message: "Tipo preço atualizado.",
      statusCode: HttpStatus.OK
    } 
  }

  async remove(id: number) {
    const tipoPreco = await this.ensureTipoPrecoExists(id);
    
    await this.prismaService.tipos_preco.delete({
      where: { tp_prec_id: id }
    })
  
    return {
      id: tipoPreco.tp_prec_id,
      message: "Tipo preço deletado com sucesso.",
      statusCode: HttpStatus.NO_CONTENT
    }
  }


  async ensureTipoPrecoExists(id: number) {
    const tipoPreco = await this.prismaService.tipos_preco.findUnique({
      where: { tp_prec_id: id }
    })

    if(!tipoPreco) throw new NotFoundException("Tipo preço não encontrado.")
    else return tipoPreco;
  }
}
