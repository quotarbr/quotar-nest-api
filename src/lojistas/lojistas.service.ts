import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLojistaDto } from './dto/create-lojista.dto';

import { UpdateLojistaDto } from './dto/update-lojista.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LOJST_STATUS, Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LojistasService {

  constructor(
    private prismaService: PrismaService
  ){}


  async create(createLojistaDto: CreateLojistaDto) {
    const hasUser = await this.prismaService.lojista.findFirst({
      where: {
        lojst_email: createLojistaDto.lojst_email,
        lojst_telefone: createLojistaDto.lojst_telefone
      }
    })

    if(hasUser) {
      throw new BadRequestException("Usuário já cadastrado.");
    }

    const data = {
      ...createLojistaDto
    };

    await this.prismaService.lojista.create({data});
    
    return {
      message: "Lojista cadastrado com sucesso",
      statusCode: HttpStatus.CREATED
    }
  }

  async findAll() {
    const lojistas = await this.prismaService.lojista.findMany();
    return lojistas.map(lojista => plainToClass(CreateLojistaDto, lojista));
  }

  async findOne(id: number) {
    const data = await this.prismaService.lojista.findUnique({
      where: {
        lojst_id: id
      }
    })

    if(!data){
      throw new BadRequestException("Lojista não encontrado.");
    }

    return {
      ...plainToClass(CreateLojistaDto, data),
      statusCode: HttpStatus.OK
    }
  }

  async update(id: number, updateLojistaDto: UpdateLojistaDto) {
    return await this.prismaService.lojista.update({
      data: updateLojistaDto,
      where: { lojst_id: id }
    }) 
  }

  async remove(id: number) {
    return await this.prismaService.lojista.delete({
      where: { lojst_id: id}
    }) 
  }
}
