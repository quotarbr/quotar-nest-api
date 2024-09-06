import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojistaDto } from './dto/create-lojista.dto';

import { UpdateLojistaDto } from './dto/update-lojista.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { ListLojistaDto } from './dto/list-lojista.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LojistaPayload } from './dto/lojista-payload.dto';

@Injectable()
export class LojistasService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ){}

  async login(lojst_login: string, senha: string) {
    const lojista = await this.prismaService.lojista.findUnique({
      where: { lojst_login }
    })

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
      token,
      message: "Lojista logado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  async create(createLojistaDto: CreateLojistaDto) {
    const { est_id, cid_id, bai_id, lojst_login } = createLojistaDto;

    const hasLojista = await this.prismaService.lojista.findFirst({
      where: {
        OR: [
          { lojst_email: createLojistaDto.lojst_email },
          { lojst_telefone: createLojistaDto.lojst_telefone },
          { lojst_cpf: createLojistaDto.lojst_cpf }
        ]
      }
    })

    if(hasLojista) throw new BadRequestException("Lojista já cadastrado"); 

    const [hasEstado, hasCidade, hasBairro, hasLogin] = await Promise.all([ 
      this.prismaService.lojista.findFirst({ where: { lojst_login } }),
      this.prismaService.estado.findUnique({ where: { est_id } }),
      this.prismaService.cidade.findFirst({ where: { est_id, cid_id } }),
      this.prismaService.bairro.findFirst({ where: { bai_id, cid_id } }),
      
    ]);

    if (hasLogin) throw new BadRequestException("Login já cadastrado!");
    if (!hasEstado) throw new BadRequestException("Estado não encontrado!");
    if (!hasCidade) throw new BadRequestException("Cidade não encontrada!");
    if (!hasBairro) throw new BadRequestException("Bairro não encontrado!");

    const data = {
      lojst_nome: createLojistaDto.lojst_nome,
      lojst_cpf: createLojistaDto.lojst_cpf,
      lojst_img_perfil: createLojistaDto.lojst_img_perfil,
      lojst_telefone: createLojistaDto.lojst_telefone,
      lojst_email: createLojistaDto.lojst_email,
      lojst_cep: createLojistaDto.lojst_cep,
      lojst_endereco: createLojistaDto.lojst_endereco,
      lojst_login: createLojistaDto.lojst_login,
      lojst_senha_hash: await bcrypt.hash(createLojistaDto.lojst_senha, 10),
      cidades: { connect: { cid_id: createLojistaDto.cid_id}},
      bairros: { connect: { bai_id: createLojistaDto.bai_id}},
      estados: { connect: { est_id: createLojistaDto.est_id}},
      lojst_loja_parceira: createLojistaDto.lojst_loja_parceira
    };

    const lojista = await this.prismaService.lojista.create({data});
    
    return {
      id: lojista.lojst_id,
      message: "Lojista cadastrado com sucesso",
      statusCode: HttpStatus.CREATED
    }
  }

  async findAll() {
    const lojistas = await this.prismaService.lojista.findMany();
    return lojistas.map(lojista => plainToClass(ListLojistaDto, lojista));
  }

  async findOne(id: number) {
    const data = await this.ensureLojistaExists(id);
    return {
      ...plainToClass(ListLojistaDto, data),
      statusCode: HttpStatus.OK
    }
  }

  async findMe(id: number){
    const lojista = await this.ensureLojistaExists(id);
    return {
      lojista,
      statusCode: HttpStatus.OK,
    }
  }

  async findByLogin(login: string){
    return await this.prismaService.lojista.findUnique({ where: { lojst_login: login } })
  }

  async update(id: number, updateLojistaDto: UpdateLojistaDto) {
    await this.ensureLojistaExists(id);

    const data = {
      lojst_nome: updateLojistaDto.lojst_nome,
      lojst_cpf: updateLojistaDto.lojst_cpf,
      lojst_img_perfil: updateLojistaDto.lojst_img_perfil,
      lojst_telefone: updateLojistaDto.lojst_telefone,
      lojst_email: updateLojistaDto.lojst_email,
      lojst_cep: updateLojistaDto.lojst_cep,
      lojst_endereco: updateLojistaDto.lojst_endereco,
      lojst_login: updateLojistaDto.lojst_login,
      lojst_senha_hash: await bcrypt.hash(updateLojistaDto.lojst_senha, 10),
      lojst_token_inspiracao: updateLojistaDto.lojst_token_inspiracao,
      lojst_token_recuperacao: updateLojistaDto.lojst_token_recuperacao,
      cidades: { connect: { cid_id: updateLojistaDto.cid_id}},
      bairros: { connect: { bai_id: updateLojistaDto.bai_id}},
      estados: { connect: { est_id: updateLojistaDto.est_id}},
      lojst_loja_parceira: updateLojistaDto.lojst_loja_parceira,
    }
    
    const lojista = await this.prismaService.lojista.update({
      data,
      where: { lojst_id: id }
    }) 

    return {
      lojista,
      message: "Lojista atualizado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    const lojista = await this.ensureLojistaExists(id);
    await this.prismaService.lojista.delete({
      where: { lojst_id: id}
    }) 
    return {
      id: lojista.lojst_id,
      message: "Lojista deletado com sucesso.",
      statusCode: HttpStatus.NO_CONTENT
    }
  }

  private async ensureLojistaExists(id: number) {
    const lojista = await this.prismaService.lojista.findUnique({
      where: {  lojst_id: id }
    });
    if (!lojista) throw new NotFoundException('Lojista não encontrado.');
    return lojista;
  }
}
