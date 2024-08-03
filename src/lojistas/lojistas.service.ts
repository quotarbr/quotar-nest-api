import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojistaDto } from './dto/create-lojista.dto';

import { UpdateLojistaDto } from './dto/update-lojista.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LOJST_STATUS, Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { ListLojistaDto } from './dto/list-lojista.dto';
import { STATUS_CODES } from 'http';

@Injectable()
export class LojistasService {

  constructor(
    private prismaService: PrismaService
  ){}

  async create(createLojistaDto: CreateLojistaDto) {
    const hasLojista = await this.prismaService.lojista.findFirst({
      where: {
        lojst_email: createLojistaDto.lojst_email,
        lojst_telefone: createLojistaDto.lojst_telefone
      }
    })

    if(hasLojista) {
      throw new BadRequestException("Usuário já cadastrado");
    }

    const data = {
      ...createLojistaDto
    };

    const lojista = await this.prismaService.lojista.create({data});
    
    return {
      id: lojista.lojst_id,
      message: "Lojista cadastrado com sucesso",
      statusCode: HttpStatus.CREATED
    }
  }

  async findAll() {
    const lojistas = await this.prismaService.lojista.findMany();
    return lojistas.map(lojista => plainToClass(ListLojistaDto, lojista));
  }

  async findOne(id: number) {
    const data = await this.ensureLojistaExists(id);
    return {
      ...plainToClass(ListLojistaDto, data),
      statusCode: HttpStatus.OK
    }
  }

  async update(id: number, updateLojistaDto: UpdateLojistaDto) {
    const data = await this.ensureLojistaExists(id);
    const lojista = await this.prismaService.lojista.update({
      data: updateLojistaDto,
      where: { lojst_id: id }
    }) 

    return {
      lojista,
      message: "Lojista atualizado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    const lojista = await this.ensureLojistaExists(id);
    await this.prismaService.lojista.delete({
      where: { lojst_id: id}
    }) 
    return {
      id: lojista.lojst_id,
      message: "Lojista deletado com sucesso.",
      statusCode: HttpStatus.NO_CONTENT
    }
  }

  private async ensureLojistaExists(id: number) {
    const lojista = await this.prismaService.lojista.findUnique({
      where: { lojst_id: id }
    });
    if (!lojista) throw new NotFoundException('Lojista não encontrado.');
    return lojista;
  }
}
