import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async findOne(id: number) {

    return await this.prismaService.loja.findUnique({
      where: { loj_id: id }
    })
  }

  async update(id: number, updateLojaDto: UpdateLojaDto) {
    return await this.prismaService.loja.update({
      data: updateLojaDto,
      where: { loj_id: id }
    })
  }

  async remove(id: number) {
    return await this.prismaService.loja.delete({
      where: { loj_id: id }
    })
  }
}
