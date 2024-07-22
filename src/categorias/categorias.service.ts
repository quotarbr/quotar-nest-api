import { Injectable } from '@nestjs/common';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaDto } from './dto/categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriasService {

  constructor(private prismaService: PrismaService){}

  async create(categoriaDto: CategoriaDto) {
    const data: Prisma.CategoriaUncheckedCreateInput = {
      cat_nome: categoriaDto.cat_nome
    }
    return await this.prismaService.categoria.create({data});
    
  }

  findAll() {
    return `This action returns all categorias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
