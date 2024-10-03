import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojistaDto } from './dto/create-lojista.dto';

import { UpdateLojistaDto } from './dto/update-lojista.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LojistaPayload } from './dto/lojista-payload.dto';
import { FiltrarLojistaDto } from './dto/filtrar-lojista.dto';
import { Lojista, Prisma } from '@prisma/client';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';
import { JsonValue } from '@prisma/client/runtime/library';

@Injectable()
export class LojistasService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ){}

  async login(lojst_login: string, senha: string) {
    const lojista = await this.prismaService.lojista.findUnique({ where: { lojst_login }});
    if(!lojista) throw new BadRequestException("Login ou senha inválido.");
    
    const senhaMatch = bcrypt.compare(senha, lojista.lojst_senha_hash);
    if(!senhaMatch) throw new BadRequestException("Login ou senha inválido.");

    const paylod: LojistaPayload = {
      sub: lojista.lojst_id,
      login: lojista.lojst_login,
      name: lojista.lojst_nome
    }

    const token = this.jwtService.sign(paylod);

    await this.prismaService.lojista.update({
      where: { lojst_id: lojista.lojst_id },
      data: { lojst_web_token: token }
    })

    return {
      message: "Lojista logado com sucesso.",
      statusCode: HttpStatus.OK,
      token,
    }
  }

  async create(createLojistaDto: CreateLojistaDto) {
    const { est_id, cid_id, bai_id, lojst_login, lojst_loja_parceira } = createLojistaDto;
    const lojaParceiraList = JSON.parse(lojst_loja_parceira);
  
    const hasLojista = await this.prismaService.lojista.findFirst({
      where: {
        OR: [
          { lojst_email: createLojistaDto.lojst_email },
          { lojst_cpf: createLojistaDto.lojst_cpf }
        ]
      }
    })
    if(hasLojista) throw new BadRequestException("Lojista já cadastrado."); 

    const [hasLogin, hasEstado, hasCidade, hasBairro] = await Promise.all([ 
      this.prismaService.lojista.findFirst({ where: { lojst_login } }),
      this.prismaService.estado.findUnique({ where: { est_id } }),
      this.prismaService.cidade.findFirst({ where: { est_id, cid_id } }),
      this.prismaService.bairro.findFirst({ where: { bai_id, cid_id } }),
      
    ]);

    if (hasLogin) throw new BadRequestException("Login já cadastrado!");
    if (!hasEstado) throw new BadRequestException("Estado não encontrado!");
    if (!hasCidade) throw new BadRequestException("Cidade não encontrada!");
    if (!hasBairro) throw new BadRequestException("Bairro não encontrado!");

    for (const idLojista of lojaParceiraList){
      const hasLojaParceira = await this.prismaService.lojista.findFirst({ where: { lojst_id: idLojista }})
      if(!hasLojaParceira) throw new BadRequestException('Loja parceira não cadastrada.');
    }

    const data = {
      lojst_nome: createLojistaDto.lojst_nome,
      lojst_cpf: createLojistaDto.lojst_cpf,
      lojst_img_perfil: createLojistaDto.lojst_img_perfil, //todo tratar imagem
      lojst_telefone: createLojistaDto.lojst_telefone, 
      lojst_email: createLojistaDto.lojst_email,
      lojst_cep: createLojistaDto.lojst_cep,
      lojst_endereco: createLojistaDto.lojst_endereco,
      lojst_login: createLojistaDto.lojst_login,
      lojst_senha_hash: await bcrypt.hash(createLojistaDto.lojst_senha, 10),
      cidade: { connect: { cid_id: createLojistaDto.cid_id}},
      bairro: { connect: { bai_id: createLojistaDto.bai_id}},
      estado: { connect: { est_id: createLojistaDto.est_id}},
      lojst_loja_parceira: createLojistaDto.lojst_loja_parceira
    };

    const lojista = await this.prismaService.lojista.create({data});
    
    return {
      id: lojista.lojst_id,
      message: "Lojista cadastrado com sucesso!",
      statusCode: HttpStatus.OK
    }
  }

  
  async findAll(params?: FiltrarLojistaDto) {
    const whereClause: Prisma.LojistaWhereInput = {}

    if(params?.string){
      whereClause.OR = [  
        { lojst_nome: { contains: params.string.trim()} },
        { lojst_email: { contains: params.string.trim()} },
        { lojst_id: +params.string || 0 }
      ]
    } 

    if(params?.status){ whereClause.lojst_status = params.status; }

    const pagina  = ( +params?.pagina || 1 );
    const limite  = ( +params?.limite || 10 );
    const skip    = ( pagina - 1 ) * limite ;
    const take    = limite;

    const lojistas = await this.prismaService.lojista.findMany({
      where: whereClause,
      take,
      skip,
      orderBy: { lojst_id: 'desc' },
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
        cidade: true,
        estado: true,
        bairro: true,
        lojst_loja_parceira: true,
        lojas: {
          select:{
            loj_id: true,
            loj_nome:true,
            loj_logo: true,
            _count: true
          }
        }
      }
    });

    const total = await this.prismaService.lojista.count({where: whereClause});

    return {
      statusCode: HttpStatus.OK,
      pagina,
      total_paginas: Math.floor( total / limite ),
      limite,
      total,
      total_resultados: lojistas.length,
      resultados: lojistas
    }
  }

  async findOne(id: number) {
    const data = await this.ensureLojistaExists(id);
    return {
      statusCode: HttpStatus.OK,
      resultado: data
    }
  }

  // async findMe(id: number){
  //   const lojista = await this.ensureLojistaExists(id);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     resultado: lojista
  //   }
  // }

  async update(id: number, updateLojistaDto: UpdateLojistaDto) {
    let { lojst_loja_parceira } = updateLojistaDto;
    const oldLojista = await this.ensureLojistaExists(id);
    const data: Prisma.LojistaUpdateInput = {}

    await this.validaUpdateInput(id, updateLojistaDto, 'lojst_cpf', 'Cpf já cadastrado!');
    await this.validaUpdateInput(id, updateLojistaDto, 'lojst_telefone', 'Telefone já cadastrado!');
    await this.validaUpdateInput(id, updateLojistaDto, 'lojst_email', 'E-mail já cadastrado!');
    await this.validaUpdateInput(id, updateLojistaDto, 'lojst_login', 'Login já cadastrado!');

    if(updateLojistaDto.hasOwnProperty('est_id')) {
      const hasEstado = await this.prismaService.estado.findFirst({ where: { est_id: updateLojistaDto.est_id } })
      if(!hasEstado) throw new BadRequestException("Estado não encontrado!");
    }

    if(updateLojistaDto.hasOwnProperty('cid_id')) {
      const hasCidade = await this.prismaService.cidade.findFirst({
        where: {
          est_id: updateLojistaDto.est_id || oldLojista.estado.est_id,
          cid_id: updateLojistaDto.cid_id
        }
      })

      if(!hasCidade) throw new BadRequestException("Cidade não encontrada!");
    }

    if(updateLojistaDto.hasOwnProperty('bai_id')) {
      const hasBairro = await this.prismaService.bairro.findFirst({
        where: {
          bai_id: updateLojistaDto.bai_id,
          cid_id: updateLojistaDto.cid_id
        }
      })
      if(!hasBairro) throw new BadRequestException("Bairro não encontrada!");
    }

    if(updateLojistaDto.hasOwnProperty('lojst_loja_parceira')){
      const lojaParceiraList = JSON.parse(lojst_loja_parceira);

      for (const idLojista of lojaParceiraList){
        const hasLojaParceira = await this.prismaService.loja.findFirst({ where: { loj_id: idLojista }})
        if(!hasLojaParceira) throw new BadRequestException('Loja parceira não cadastrada.');
      }
      lojst_loja_parceira = await this.updateLojaParceira(oldLojista.lojst_loja_parceira, lojaParceiraList); 
    }
    
    const lojista = await this.prismaService.lojista.update({
      data: {
        ...updateLojistaDto
      }, 
      where: { lojst_id: id }
    }) 

    return {
      id: lojista.lojst_id,
      message: "Lojista atualizado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  async updateLojaParceira(currentLojaParceira: JsonValue, lojaParceiraUpdate ){
    const currentLojaParceiraList = JSON.parse(currentLojaParceira as string);
    const lojaParceiraUpdateList = lojaParceiraUpdate;
    let updatedLojaParceiraList = [...currentLojaParceiraList];

    const idsToAdd = lojaParceiraUpdateList.filter(id => !currentLojaParceiraList?.includes(id));
    const idsToRemove = currentLojaParceiraList.filter( id => !lojaParceiraUpdateList?.includes(id));

    if(idsToAdd.length > 0) {
      updatedLojaParceiraList = currentLojaParceiraList.concat(idsToAdd);
    }
    if(idsToRemove.length > 0) updatedLojaParceiraList = updatedLojaParceiraList.filter(id => !idsToRemove.includes(id));
  
    return (JSON.stringify(updatedLojaParceiraList));
  }

  async validaUpdateInput(id: number, updateLojistaDto: UpdateLojistaDto, property?: string, msgBadRequest?: string){
    if(updateLojistaDto.hasOwnProperty(property)){
      const hasProperty = await this.prismaService.lojista.findFirst({
        where: { [property]: updateLojistaDto[property], lojst_id: {not: id} }
      })
      if(hasProperty) throw new BadRequestException(msgBadRequest);
    }
    return 
  }

  async remove(id: number) {
    const lojista = await this.ensureLojistaExists(id);
    await this.prismaService.lojista.delete({
      where: { lojst_id: id}
    }) 
    return {
      id: lojista.lojst_id,
      message: "Lojista deletado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  private async ensureLojistaExists(id: number) {
    const lojista = await this.prismaService.lojista.findUnique({
      where: {  lojst_id: id },
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
        cidade: true,
        estado: true,
        bairro: true,
        lojst_loja_parceira: true,
        lojas: {
          select:{
            loj_id: true,
            loj_nome:true,
            loj_logo: true,
            _count: true
          }
        }
      }
    });
    if (!lojista) throw new NotFoundException('Lojista não encontrado.');
    return lojista;
  }
}
