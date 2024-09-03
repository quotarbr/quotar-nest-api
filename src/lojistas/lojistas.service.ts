import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojistaDto } from './dto/create-lojista.dto';

import { UpdateLojistaDto } from './dto/update-lojista.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LOJST_STATUS, Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { ListLojistaDto } from './dto/list-lojista.dto';
import { STATUS_CODES } from 'http';

import { compare, hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { FiltrarLojistaDto } from './dto/filtrar-lojista.dto';

@Injectable()
export class LojistasService {

  constructor(
    private prismaService: PrismaService
  ){}

  async create(createLojistaDto: CreateLojistaDto) {
    const hasLojista = await this.prismaService.lojista.findFirst({
      where: {
        OR:[
          {
            lojst_email: createLojistaDto.lojst_email,
          },
          {
            lojst_telefone: createLojistaDto.lojst_telefone
          },
          {
            lojst_cpf: createLojistaDto.lojst_cpf
          }
        ]
      }
    })

    if(hasLojista) {
      throw new BadRequestException("Lojista já cadastrado");
    }

    const hasEstado = await this.prismaService.estado.findUnique({
      where: {
        est_id: createLojistaDto.est_id
      }
    })

    if(!hasEstado) {
      throw new BadRequestException("Estado não encontrado!");
    }

    const hasCidade = await this.prismaService.cidade.findFirst({
      where: {
        est_id: createLojistaDto.est_id,
        cid_id: createLojistaDto.cid_id
      }
    })

    if(!hasCidade) {
      throw new BadRequestException("Cidade não encontrada!");
    }

    const hasBairro = await this.prismaService.bairro.findFirst({
      where: {
        bai_id: createLojistaDto.bai_id,
        cid_id: createLojistaDto.cid_id
      }
    })

    if(!hasBairro) {
      throw new BadRequestException("Bairro não encontrada!");
    }

    const hasLogin = await this.prismaService.lojista.findFirst({
      where: {
        lojst_login: createLojistaDto.lojst_login
      }
    })
    if(hasLogin) {
      throw new BadRequestException("Login já cadastrado!");
    }


    const data: Prisma.LojistaCreateInput = {
      lojst_nome: createLojistaDto.lojst_nome,
      lojst_cpf: createLojistaDto.lojst_cpf,
      lojst_img_perfil: "",
      lojst_telefone: createLojistaDto.lojst_telefone,
      lojst_email: createLojistaDto.lojst_email,
      lojst_cep: createLojistaDto.lojst_cep,
      lojst_endereco: createLojistaDto.lojst_endereco,
      lojst_status: createLojistaDto.lojst_status,
      lojst_login: createLojistaDto.lojst_login,
      lojst_senha_hash: await hash(createLojistaDto?.lojst_senha || "", 8),
      cidades:{
        connect: {
          cid_id: createLojistaDto.cid_id
        }
      },
      estados:{
        connect: {
          est_id: createLojistaDto.est_id
        }
      },
      bairros:{
        connect: {
          bai_id: createLojistaDto.bai_id
        }
      }
    };

    const lojista = await this.prismaService.lojista.create({data});
    
    return {
      id: lojista.lojst_id,
      message: "Lojista cadastrado com sucesso",
      statusCode: HttpStatus.CREATED
    }
  }

  async findAll(params?: FiltrarLojistaDto) {

    const whereClause: Prisma.LojistaWhereInput = {};
    
    if (params?.string) {
      whereClause.OR = [
        { lojst_nome : { contains: params.string.trim() } },
        { lojst_email : { contains: params.string.trim() } },
        { lojst_id :  +params.string || 0 },
      ]
    }

    if (params?.status) {
      whereClause.lojst_status = params.status; 
    }
  
    const pagina = (+params?.pagina || 1)
    const limite = (+params?.limite || 10)

    const skip = (pagina - 1) * limite;
    const take = limite;
    
    const lojistas = await this.prismaService.lojista.findMany({
      where: whereClause,
      skip: skip,
      take: take,
      orderBy: {
        lojst_id: 'desc'
      },
      select: {
        lojst_id: true,
        lojst_nome: true,
        lojst_cpf: true,
        lojst_img_perfil: true,
        lojst_telefone: true,
        lojst_email: true,
        lojst_data_cadastro: true,
        lojst_cep: true,
        lojst_endereco: true,
        lojst_status: true,
        cidades: true,
        estados: true,
        bairros: true,
        lojas: {
          select:{
            loj_id: true,
            loj_nome:true,
            loj_logo: true,
            _count: true
          }
        },
      }
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
      resultados: lojistas
    }
  }

  async findOne(id: number) {
    const data = await this.ensureLojistaExists(id);
    return {
      statusCode: HttpStatus.OK,
      resultado :  data
    }
  }

  async findMe(id: number) {
    const data = await this.ensureLojistaExists(id);
    return {
      statusCode: HttpStatus.OK,
      resultado :  data
    }
  }

  async update(id: number, updateLojistaDto: UpdateLojistaDto) {
    const oldLojista = await this.ensureLojistaExists(id);

    const data: Prisma.LojistaUpdateInput = {};

    if(updateLojistaDto.hasOwnProperty('lojst_nome')) data.lojst_nome = updateLojistaDto.lojst_nome;
    
    if(updateLojistaDto.hasOwnProperty('lojst_cpf')) {
      const hasCpf = await this.prismaService.lojista.findFirst({
        where: {
          lojst_cpf: updateLojistaDto.lojst_cpf ,
          lojst_id: { not: oldLojista.lojst_id } 
        }
      })

      if(hasCpf) {
        throw new BadRequestException("Cpf já cadastrado!");
      }
      data.lojst_cpf = updateLojistaDto.lojst_cpf;
    }

    if(updateLojistaDto.hasOwnProperty('lojst_telefone')) {
      const hasTelefone = await this.prismaService.lojista.findFirst({
        where: {
          lojst_telefone: updateLojistaDto.lojst_telefone,
          lojst_id: {
            not: oldLojista.lojst_id
          }
        }
      })
      if(hasTelefone) {
        throw new BadRequestException("Telefone já cadastrado!");
      }
      data.lojst_telefone = updateLojistaDto.lojst_telefone;
    }

    if(updateLojistaDto.hasOwnProperty('lojst_email')) {
      const hasEmail = await this.prismaService.lojista.findFirst({
        where: {
          lojst_email: updateLojistaDto.lojst_email,
          lojst_id: {
            not: oldLojista.lojst_id
          }
        }
      })
      if(hasEmail) {
        throw new BadRequestException("E-mail já cadastrado!");
      }
      data.lojst_email = updateLojistaDto.lojst_email;
    }

    if(updateLojistaDto.hasOwnProperty('lojst_login')) {
      const hasLogin = await this.prismaService.lojista.findFirst({
        where: {
          lojst_login: updateLojistaDto.lojst_login,
          lojst_id: {
            not: oldLojista.lojst_id
          }
        }
      })
      if(hasLogin) {
        throw new BadRequestException("Login já cadastrado!");
      }
      data.lojst_login = updateLojistaDto.lojst_login;
    }

    if(updateLojistaDto.hasOwnProperty('lojst_cep')) {
      data.lojst_cep = updateLojistaDto.lojst_cep;
    }

    if(updateLojistaDto.hasOwnProperty('lojst_endereco')) {
      data.lojst_endereco = updateLojistaDto.lojst_endereco;
    }
    if(updateLojistaDto.hasOwnProperty('lojst_status')) {
      data.lojst_status = updateLojistaDto.lojst_status;
    }

    if(updateLojistaDto.hasOwnProperty('lojst_status')) {
      data.lojst_status = updateLojistaDto.lojst_status;
    }

    if(updateLojistaDto.hasOwnProperty('est_id')) {
      const hasEstado = await this.prismaService.lojista.findFirst({
        where: {
          est_id: updateLojistaDto.est_id
        }
      })
      if(!hasEstado) {
        throw new BadRequestException("Estado não encontrado!");
      }
      data.estados = { connect: { est_id : updateLojistaDto.est_id } }
    }


    if(updateLojistaDto.hasOwnProperty('cid_id')) {
      const hasCidade = await this.prismaService.lojista.findFirst({
        where: {
          est_id: updateLojistaDto.est_id,
          cid_id: updateLojistaDto.cid_id
        }
      })
      if(!hasCidade) {
        throw new BadRequestException("Cidade não encontrada!");
      }
      data.cidades = { connect: { cid_id : updateLojistaDto.cid_id } }
    }


    if(updateLojistaDto.hasOwnProperty('bai_id')) {
      const hasBairro = await this.prismaService.lojista.findFirst({
        where: {
          bai_id: updateLojistaDto.bai_id,
          cid_id: updateLojistaDto.cid_id
        }
      })
      if(!hasBairro) {
        throw new BadRequestException("Cidade não encontrada!");
      }
      data.bairros = { connect: { bai_id : updateLojistaDto.bai_id } }
    }

    const lojista = await this.prismaService.lojista.update({
      data,
      where: { lojst_id: id }
    }) 

    return {
      id: lojista.lojst_id,
      message: "Lojista atualizado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    const lojista = await this.ensureLojistaExists(id);
    await this.prismaService.lojista.delete({
      where: { lojst_id: id }
    }) 

    return {
      id: lojista.lojst_id,
      message: "Lojista deletado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  private async ensureLojistaExists(id: number) {
    const lojista = await this.prismaService.lojista.findUnique({
      where: { lojst_id: id },
      select: {
        lojst_id: true,
        lojst_nome: true,
        lojst_cpf: true,
        lojst_img_perfil: true,
        lojst_telefone: true,
        lojst_email: true,
        lojst_data_cadastro: true,
        lojst_cep: true,
        lojst_endereco: true,
        lojst_status: true,
        cidades: true,
        estados: true,
        bairros: true,
        lojas: {
          select:{
            loj_id: true,
            loj_nome:true,
            loj_logo: true,
            _count: true
          }
        },
        
      }
    });
    
    if (!lojista) throw new NotFoundException('Lojista não encontrado.');
    return lojista;
  }

  async login(lojst_login: string, lojst_senha: string) {
    const where: Prisma.LojistaWhereInput = { lojst_login };
    const lojista = await this.prismaService.lojista.findFirst({ where });

    if (lojista && await compare(lojst_senha, lojista.lojst_senha_hash)) {
      const token = randomBytes(40).toString('hex');  
      if(token){
        await this.prismaService.lojista.update({
          where:{
            lojst_id: lojista.lojst_id,
          },
          data : {
            lojst_web_token: token,
          }
        })
      }

      return { 
        message: 'Autenticado com sucesso',
        statusCode: HttpStatus.OK,
        token: token
      } 
    }

    throw new BadRequestException('Login ou senha inválidos');
  }
}
