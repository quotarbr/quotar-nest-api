import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { USR_STATUS } from './dto/usr-status.enum';

@Injectable()
export class UsuariosService {
  
  constructor(
    private prismaService: PrismaService
  ){}

  async create(createUsuarioDto: CreateUsuarioDto) {
 
    this.hasUser(createUsuarioDto);

    const data = {
      usr_nome: createUsuarioDto.usr_nome,
      usr_cpf: createUsuarioDto.usr_cpf,
      usr_img_perfil: createUsuarioDto.usr_img_perfil,
      usr_telefone: createUsuarioDto.usr_telefone,
      usr_email: createUsuarioDto.usr_email,
      usr_cep: createUsuarioDto.usr_cep,
      usr_endereco: createUsuarioDto.usr_endereco,
      cidades: { connect: { cid_id: createUsuarioDto.cid_id } },
      bairros: { connect: { bai_id: createUsuarioDto.bai_id } },
      estados: { connect: { est_id: createUsuarioDto.est_id } },
      usr_prod_favoritos: createUsuarioDto.usr_prod_favoritos,
      usr_loj_favoritas: createUsuarioDto.usr_loj_favoritas,
      usr_senha_hash: await this.createHashFromSenha(createUsuarioDto.usr_senha_hash),
      usr_token_inspiracao: createUsuarioDto.usr_token_inspiracao,
      usr_token_recuperacao: createUsuarioDto.usr_token_recuperacao
    };

    const usuario = await this.prismaService.usuario.create({ data });
    

    return {
      usuario,
      statusCode: HttpStatus.CREATED
    }
  }

  async findAll() {
    const usuarios = await this.prismaService.usuario.findMany();
    const totalUsuarios = await this.prismaService.usuario.count();

    return {
      statusCode: HttpStatus.OK,
      usuarios,
      total: totalUsuarios
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }


  async hasUser(createUsuarioDto: CreateUsuarioDto) {
    const hasUser = await this.prismaService.usuario.findFirst({
      where: {
        usr_email: createUsuarioDto.usr_email,
        usr_nome: createUsuarioDto.usr_nome,
        usr_cpf: createUsuarioDto.usr_cpf
      } 
    })

    if(hasUser) throw new BadRequestException("Usuário já cadastrado.");

    return true;
  }

  async createHashFromSenha(senha: string){
    const hash = senha;
    return hash;
  }

  // private async escolheStatus(status : string){
  //   return status == "liberacao" ? USR_STATUS.LIBERACAO : status == "ativo" 
  //     ? USR_STATUS.ATIVO : USR_STATUS.INATIVO 
  // } 
}

