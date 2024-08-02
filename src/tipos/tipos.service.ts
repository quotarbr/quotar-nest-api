import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { TipoDto } from './dto/tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TiposService {
  constructor(private prismaService: PrismaService){}

  async create(tipoDto: TipoDto) {
    const hasTipo = await this.prismaService.tipo.findFirst({
      where: {
        tp_nome: tipoDto.tp_nome
      }
    })

    if(hasTipo) throw new BadRequestException("Tipo já cadastrado.")



    const data = {
      ...tipoDto
    }

    const tipo = await this.prismaService.tipo.create({data})

    return {
      id: tipo.tp_id,
      message: "Tipo cadastrado com sucesso.",
      statusCode: HttpStatus.CREATED
    }
  }

  async findAll() {
    return await this.prismaService.tipo.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.tipo.findUnique({
      where: {
        tp_id: id
      }
    });
  }

  async update(id: number, updateTipoDto: UpdateTipoDto) {
    return this.prismaService.tipo.update({
      data: updateTipoDto,
      where: {
        tp_id: id
      }
    })
  }

  async remove(id: number) {
    return await this.prismaService.tipo.delete({
      where:{
        tp_id: id
      }
    })
  }
}
