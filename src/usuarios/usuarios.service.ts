import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
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
      usr_senha_hash: await bcrypt.hash(createUsuarioDto.usr_senha, 10),
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

  async findOne(id: number) {
    const usuario = await this.prismaService.usuario.findUnique({
      where: { usr_id: id}
    });
    if(!usuario) throw new BadRequestException("Usuário não existe.")
    return {
      usuario,
      message: "Usuário encontrado",
      statusCode: HttpStatus.OK
    }
  }

  async findByEmail(email: string){
    const usuario = await this.prismaService.usuario.findUnique({
      where: { usr_email: email}
    })
    if(!usuario) throw new BadRequestException("Usuário não existe.")
    return {
      usuario,
      message: "Usuário encontrado",
      statusCode: HttpStatus.OK
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);

    const data = {
      usr_nome: updateUsuarioDto.usr_nome,
      usr_cpf: updateUsuarioDto.usr_cpf,
      usr_img_perfil: updateUsuarioDto.usr_img_perfil,
      usr_telefone: updateUsuarioDto.usr_telefone,
      usr_email: updateUsuarioDto.usr_email,
      usr_cep: updateUsuarioDto.usr_cep,
      usr_endereco: updateUsuarioDto.usr_endereco,
      usr_status: await this.escolheStatus(updateUsuarioDto.usr_status),
      cidades: { connect: { cid_id: updateUsuarioDto.cid_id } },
      bairros: { connect: { bai_id: updateUsuarioDto.bai_id } },
      estados: { connect: { est_id: updateUsuarioDto.est_id } },
      usr_prod_favoritos: updateUsuarioDto.usr_prod_favoritos,
      usr_loj_favoritas: updateUsuarioDto.usr_loj_favoritas
    }

    const usuario = await this.prismaService.usuario.update({
      data,
      where: { usr_id: id }
    })

    return {
      id: usuario.usr_id,
      message: "Usuário atualizado com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);

    if (usuario) this.prismaService.usuario.delete({ where: { usr_id: id} });

    return {
      message: "Usuário deletado com sucesso",
      statusCode: HttpStatus.NO_CONTENT
    } ;
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

  async escolheStatus(status : string){
    return status == "liberacao" ? USR_STATUS.LIBERACAO : status == "ativo" 
      ? USR_STATUS.ATIVO : USR_STATUS.INATIVO 
  } 
}

