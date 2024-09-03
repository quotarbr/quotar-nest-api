import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaDto } from './dto/categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FiltrarCategoriasDto } from './dto/filtrar-categorias.dto';

@Injectable()
export class CategoriasService {

  constructor(private prismaService: PrismaService){}

  async create(categoriaDto: CategoriaDto) {
    const hasCategoria = await this.prismaService.categoria.findFirst({
      where: {
        cat_nome: categoriaDto.cat_nome
      }
    })

    if(hasCategoria){ throw new BadRequestException("Categoria já cadastrada.") }

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

  async findAll(params: FiltrarCategoriasDto) {
    
    const whereClause: Prisma.LojistaWhereInput = {};
    const pagina = (+params?.pagina || 1)
    const limite = (+params?.limite || 10)

    const skip = (pagina - 1) * limite;
    const take = limite;

    const resultados = await this.prismaService.categoria.findMany({
      where: whereClause,
      skip: skip,
      take: take,
      orderBy: {
        cat_nome: 'desc'
      },
    });

    const total_resultados = await this.prismaService.lojista.count({where: whereClause});
    const total = await this.prismaService.lojista.count();

    return {
      statusCode: HttpStatus.OK,
      paginas: Math.ceil(total / limite),
      pagina,
      limite,
      total,
      total_resultados, 
      resultados
    }
  }

  async findOne(id: number) {
    const categoria = await this.prismaService.categoria.findUnique({
      where: {
        cat_id: id
      }
    })

    if(!categoria) throw new NotFoundException("Categoria não encontrada.")

    return {
      statusCode: HttpStatus.OK,
      resultado : categoria,
    }
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    await this.findOne(id)
    await this.prismaService.categoria.update({
      data: updateCategoriaDto,
      where: {
        cat_id: id
      }
    });
    return {
      message: "Categoria atualizada com sucesso!",
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    await this.findOne(id)
    const data = await this.prismaService.categoria.delete({
      where: {
        cat_id: id
      }
    })

    return {
      message: "Categoria deletada com sucesso",
      statusCode: HttpStatus.OK
    }
  }
}
