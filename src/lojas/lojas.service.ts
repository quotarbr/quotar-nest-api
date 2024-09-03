import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FiltrarLojaDto } from './dto/filtrar-loja.dto';
import { LojistasService } from 'src/lojistas/lojistas.service';

@Injectable()
export class LojasService {

  constructor(
    private prismaService: PrismaService
  ){}

  async create(createLojaDto: CreateLojaDto, id?: number) {

    // Verificar se a loja já existe
    const hasLoja = await this.prismaService.loja.findFirst({
      where: {
        OR: [
          { loj_email: createLojaDto.loj_email },
          { loj_telefone: createLojaDto.loj_telefone },
          { loj_cnpj: createLojaDto.loj_cnpj }
        ]
      }
    });

    if (hasLoja) {
      throw new BadRequestException("Loja já cadastrada");
    }

    // Verificar se o Estado, Cidade e Bairro existem
    const hasEstado = await this.prismaService.estado.findUnique({
      where: { est_id: createLojaDto.est_id }
    });

    if (!hasEstado) {
      throw new BadRequestException("Estado não encontrado!");
    }

    const hasCidade = await this.prismaService.cidade.findFirst({
      where: {
        est_id: createLojaDto.est_id,
        cid_id: createLojaDto.cid_id
      }
    });

    if (!hasCidade) {
      throw new BadRequestException("Cidade não encontrada!");
    }

    const hasBairro = await this.prismaService.bairro.findFirst({
      where: {
        bai_id: createLojaDto.bai_id,
        cid_id: createLojaDto.cid_id
      }
    });

    if (!hasBairro) {
      throw new BadRequestException("Bairro não encontrado!");
    }


    const hasLojista = await this.prismaService.lojista.findUnique({
      where: {
        lojst_id: id || null
      }
    });

    if (!hasLojista) {
      throw new BadRequestException("Lojista não encontrado!");
    }

    

    // Dados para criar a loja
    const data: Prisma.LojaCreateInput = {
      loj_nome: createLojaDto.loj_nome,
      loj_cnpj: createLojaDto.loj_cnpj,
      loj_logo: createLojaDto.loj_logo || "",
      loj_slogan: createLojaDto.loj_slogan || "",
      loj_telefone: createLojaDto.loj_telefone,
      loj_email: createLojaDto.loj_email,
      loj_text_sobre: createLojaDto.loj_text_sobre || "",
      loj_cep: createLojaDto.loj_cep,
      loj_endereco: createLojaDto.loj_endereco,
      cidades: {
        connect: { cid_id: createLojaDto.cid_id }
      },
      estados: {
        connect: { est_id: createLojaDto.est_id }
      },
      bairros: {
        connect: { bai_id: createLojaDto.bai_id }
      },
      lojistas: {
        connect: { lojst_id: id}
      }
    };

    const loja = await this.prismaService.loja.create({ data });

    return {
      id: loja.loj_id,
      message: "Loja cadastrada com sucesso",
      statusCode: HttpStatus.CREATED
    };
  }

  async findAll(params?: FiltrarLojaDto) {
    const whereClause: Prisma.LojaWhereInput = {};
    
    if (params?.string) {
      whereClause.OR = [
        { loj_nome : { contains: params.string.trim() } },
        { loj_email : { contains: params.string.trim() } },
        { loj_endereco : { contains: params.string.trim() } },
      ]
    }

    const pagina = (+params?.pagina || 1)
    const limite = (+params?.limite || 10)

    const skip = (pagina - 1) * limite;
    const take = limite;
    

    const lojas = await this.prismaService.loja.findMany({
      where: whereClause,
      skip: skip,
      take: take,
      orderBy: {
        loj_id: 'desc'
      },
      select: {
        loj_id: true,
        loj_nome: true,
        loj_cnpj: true,
        loj_logo: true,
        loj_slogan: true,
        loj_telefone: true,
        loj_email: true,
        loj_cep: true,
        loj_endereco: true,
        loj_data_cadastro: true,
        estados: true,
        cidades: true,
        bairros: true
      },
    });

    const total_resultados = await this.prismaService.loja.count({where: whereClause});
    const total = await this.prismaService.loja.count();

    return {
      statusCode: HttpStatus.OK,
      paginas: Math.ceil(total / limite),
      pagina,
      limite,
      total,
      total_resultados, 
      resultados: lojas
    };
  }

  async findOne(id: number) {
    const loja = await this.ensureLojaExists(id);
    return {
      statusCode: HttpStatus.OK,
      resultado: loja
    };
  }

  async update(id: number, updateLojaDto: UpdateLojaDto) {
    const oldLoja = await this.ensureLojaExists(id);

    const data: Prisma.LojaUpdateInput = {};

    if(updateLojaDto.hasOwnProperty('loj_nome')) data.loj_nome = updateLojaDto.loj_nome;

    if(updateLojaDto.hasOwnProperty('loj_cnpj')) {
      const hasCnpj = await this.prismaService.loja.findFirst({
        where: {
          loj_cnpj: updateLojaDto.loj_cnpj,
          loj_id: { not: oldLoja.loj_id }
        }
      });
      if(hasCnpj) {
        throw new BadRequestException("CNPJ já cadastrado!");
      }
      data.loj_cnpj = updateLojaDto.loj_cnpj;
    }

    if(updateLojaDto.hasOwnProperty('loj_telefone')) {
      const hasTelefone = await this.prismaService.loja.findFirst({
        where: {
          loj_telefone: updateLojaDto.loj_telefone,
          loj_id: { not: oldLoja.loj_id }
        }
      });
      if(hasTelefone) {
        throw new BadRequestException("Telefone já cadastrado!");
      }
      data.loj_telefone = updateLojaDto.loj_telefone;
    }

    if(updateLojaDto.hasOwnProperty('loj_email')) {
      const hasEmail = await this.prismaService.loja.findFirst({
        where: {
          loj_email: updateLojaDto.loj_email,
          loj_id: { not: oldLoja.loj_id }
        }
      });
      if(hasEmail) {
        throw new BadRequestException("E-mail já cadastrado!");
      }
      data.loj_email = updateLojaDto.loj_email;
    }

    if(updateLojaDto.hasOwnProperty('loj_cep')) {
      data.loj_cep = updateLojaDto.loj_cep;
    }

    if(updateLojaDto.hasOwnProperty('loj_endereco')) {
      data.loj_endereco = updateLojaDto.loj_endereco;
    }

    if(updateLojaDto.hasOwnProperty('est_id')) {
      const hasEstado = await this.prismaService.estado.findUnique({
        where: { est_id: updateLojaDto.est_id }
      });
      if (!hasEstado) {
        throw new BadRequestException("Estado não encontrado!");
      }
      data.estados = { connect: { est_id: updateLojaDto.est_id } };
    }

    if(updateLojaDto.hasOwnProperty('cid_id')) {
      const hasCidade = await this.prismaService.cidade.findFirst({
        where: {
          cid_id: updateLojaDto.cid_id,
          est_id: updateLojaDto.est_id
        }
      });
      if (!hasCidade) {
        throw new BadRequestException("Cidade não encontrada!");
      }
      data.cidades = { connect: { cid_id: updateLojaDto.cid_id } };
    }

    if(updateLojaDto.hasOwnProperty('bai_id')) {
      const hasBairro = await this.prismaService.bairro.findFirst({
        where: {
          bai_id: updateLojaDto.bai_id,
          cid_id: updateLojaDto.cid_id
        }
      });
      if (!hasBairro) {
        throw new BadRequestException("Bairro não encontrado!");
      }
      data.bairros = { connect: { bai_id: updateLojaDto.bai_id } };
    }

    const loja = await this.prismaService.loja.update({
      where: { loj_id: id },
      data
    });

    return {
      id: loja.loj_id,
      message: "Loja atualizada com sucesso.",
      statusCode: HttpStatus.OK
    };
  }

  async remove(id: number) {
    const loja = await this.ensureLojaExists(id);
    await this.prismaService.loja.delete({
      where: { loj_id: id }
    });

    return {
      id: loja.loj_id,
      message: "Loja deletada com sucesso.",
      statusCode: HttpStatus.OK
    };
  }

  private async ensureLojaExists(id: number) {
    const loja = await this.prismaService.loja.findUnique({
      where: { loj_id: id },
      select: {
        loj_id: true,
        loj_nome: true,
        loj_cnpj: true,
        loj_logo: true,
        loj_slogan: true,
        loj_telefone: true,
        loj_email: true,
        loj_cep: true,
        loj_endereco: true,
        loj_data_cadastro: true,
        estados: true,
        cidades: true,
        bairros: true,
        lojistas: {
          select:{
            lojst_id: true,
            lojst_nome: true,
          }
        }
      }
    });
    
    if (!loja) throw new NotFoundException('Loja não encontrada.');
    return loja;
  }
}
