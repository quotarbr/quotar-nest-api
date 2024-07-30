import { Injectable } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LojasService {

  constructor(
    private prismaService: PrismaService
  ){}

  create(createLojaDto: CreateLojaDto) {


    const data = {
      ...createLojaDto
    }
    return this.prismaService.loja.create({data})
  }

  findAll() {
    return `This action returns all lojas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loja`;
  }

  update(id: number, updateLojaDto: UpdateLojaDto) {
    return `This action updates a #${id} loja`;
  }

  remove(id: number) {
    return `This action removes a #${id} loja`;
  }
}
