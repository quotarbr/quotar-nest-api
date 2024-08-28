import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { STATUS_CODES } from 'http';

@Injectable()
export class LojasService {

  constructor(
    private prismaService: PrismaService
  ){}

  async create(createLojaDto: CreateLojaDto) {

    const hasLoja = await this.prismaService.loja.findFirst({
      where: {
        loj_email: createLojaDto.loj_email,
        loj_telefone: createLojaDto.loj_telefone
      }
    })

    if(hasLoja){
      throw new BadRequestException("Loja já cadastrada")
    }

    const data = {
      ...createLojaDto
    }

    const loja = await this.prismaService.loja.create({data})

    return {
      id: loja.loj_id,
      message: "Loja cadastrada com sucesso",
      statusCode: HttpStatus.CREATED
    }
  }

  async findAll() {
    return await this.prismaService.loja.findMany();
  }

  async findByNome(nome: string){
    return await this.prismaService.loja.findMany({
      where: {
        loj_nome: nome
      },
      select: {
        loj_id: true
      }
    })
  }

  async findOne(id: number) {
    const loja = await this.prismaService.loja.findUnique({
      where: { loj_id: id }
    })
    if(!loja) throw new BadRequestException("Loja não encontrada.")

    return {
      loja,
      statusCode: HttpStatus.OK
    } 
  }

  async update(id: number, updateLojaDto: UpdateLojaDto) {
    const loja = await this.prismaService.loja.findUnique({
      where: { loj_id: id }
    })

    if(!loja) throw new NotFoundException("Loja não encontrada.")

    return await this.prismaService.loja.update({
      data: updateLojaDto,
      where: { loj_id: id }
    })
  }

  async remove(id: number) {
    const loja = await this.prismaService.loja.findUnique({
      where: { loj_id: id }
    })

    if(!loja) throw new NotFoundException("Loja não encontrada.")

    return await this.prismaService.loja.delete({
      where: { loj_id: id }
    })
  }
}
