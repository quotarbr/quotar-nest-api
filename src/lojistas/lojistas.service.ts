import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLojistaDto } from './dto/create-lojista.dto';

import { UpdateLojistaDto } from './dto/update-lojista.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LOJST_STATUS, Prisma } from '@prisma/client';

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
      ...createLojistaDto,
      lojst_status: LOJST_STATUS.pendente
    } 

    await this.prismaService.lojista.create({data});
    
    return {
      message: "Lojista cadastrado com sucesso",
      statusCode: HttpStatus.CREATED
    }
  }

  async findAll() {
    return await this.prismaService.lojista.findMany();
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
      ...data,
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
