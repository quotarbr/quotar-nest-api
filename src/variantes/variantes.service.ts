import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VariantesService {
  constructor(
    private prismaService: PrismaService
  ){}

  create(createVarianteDto: CreateVarianteDto) {
    // const hasVariante = this.prismaService.variante.findFirst({
    //   where: {
        
    //   }
    // })

    // if(hasVariante) throw new BadRequestException("Variante já cadastrada")
    
    return 'This action adds a new variante';
  }

  findAll() {
    return `This action returns all variantes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variante`;
  }

  update(id: number, updateVarianteDto: UpdateVarianteDto) {
    return `This action updates a #${id} variante`;
  }

  remove(id: number) {
    return `This action removes a #${id} variante`;
  }
}
