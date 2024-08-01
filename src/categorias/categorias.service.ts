import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaDto } from './dto/categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriasService {

  constructor(private prismaService: PrismaService){}

  async create(categoriaDto: CategoriaDto) {
    const hasCategoria = await this.prismaService.categoria.findFirst({
      where: {
        cat_nome: categoriaDto.cat_nome
      }
    })

    if(hasCategoria){
      throw new BadRequestException("Categoria já cadastrada.")
    }

    const data = {
      ...categoriaDto
    }

    const categoria = await this.prismaService.categoria.create({data});
    return {
      id: categoria.cat_id,
      message: "Categoria cadastrada com sucesso.",
      statusCode: HttpStatus.CREATED
    }
    
  }

  async findAll() {
    const data = await this.prismaService.categoria.findMany({
      orderBy:{
        cat_nome: 'asc'
      }
      
    });
    return { data }
  }

  async findOne(id: number) {
    const categoria = await this.prismaService.categoria.findUnique({
      where: {
        cat_id: id
      }
    })

    if(!categoria) throw new BadRequestException("Categoria não encontrada.")

    return {
      categoria,
      statusCode: HttpStatus.OK
    }
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return await this.prismaService.categoria.update({
      data: updateCategoriaDto,
      where: {
        cat_id: id
      }
    });
  }

  async remove(id: number) {
    const data = await this.prismaService.categoria.delete({
      where: {
        cat_id: id
      }
    })
    return {
      message: "Categoria deletada com sucesso",
      statusCode: HttpStatus.NO_CONTENT
    }
  }
}
