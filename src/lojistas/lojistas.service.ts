import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLojistaDto } from './dto/create-lojista.dto';

import { UpdateLojistaDto } from './dto/update-lojista.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

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
      throw new BadRequestException("Usuário já cadastrado");
    }

    const data = {
      // lojst_nome:               createLojistaDto.lojst_nome,
      // lojst_cpf:                createLojistaDto.lojst_cpf,
      // lojst_img_perfil:         createLojistaDto.lojst_img_perfil,
      // lojst_telefone:           createLojistaDto.lojst_telefone,
      // lojst_email:              createLojistaDto.lojst_email,
      // lojst_cep:                createLojistaDto.lojst_cep,
      // lojst_endereco:           createLojistaDto.lojst_endereco,
      // lojst_status:             createLojistaDto.lojst_status,
      // lojst_loguin:             createLojistaDto.lojst_loguin,
      // lojst_senha_hash:         createLojistaDto.lojst_senha_hash,
      // lojst_token_inspiracao:   createLojistaDto.lojst_token_inspiracao,
      // lojst_token_recuperacao:  createLojistaDto.lojst_token_recuperacao,
      // cid_id:                   createLojistaDto.cid_id,
      // bai_id:                   createLojistaDto.bai_id,
      // est_id:                   createLojistaDto.est_id,
      // lojst_loja_parceira:      createLojistaDto.lojst_loja_parceira
      ...createLojistaDto
    } 

    await this.prismaService.lojista.create({data});

    return {
      message: "Usuário cadastrado com sucesso",
      statusCode: 200 
    }
  }

  findAll() {
    return this.prismaService.lojista.findMany();
  }

  findOne(id: number) {
    const data = this.prismaService.lojista.findUnique({
      where: {
        lojst_id: id
      }
    })

    return {
     data: data
    }
    
  }

  update(id: number, updateLojistaDto: UpdateLojistaDto) {
    return `This action updates a #${id} lojista`;
  }

  remove(id: number) {
    return `This action removes a #${id} lojista`;
  }
}
