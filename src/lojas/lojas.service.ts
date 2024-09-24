import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FiltrarLojasDto } from './dto/filtrar-loja.dto';

@Injectable()
export class LojasService {

  constructor(
    private prismaService: PrismaService
  ){}

  async create(createLojaDto: CreateLojaDto) {
    const {loj_cnpj, loj_nome, loj_email, est_id, cid_id, bai_id} = createLojaDto;
  
    const hasLoja = await this.prismaService.loja.findFirst({ where: { loj_email }})
    if(hasLoja){ throw new BadRequestException("Loja já cadastrada") };

    const hasCnpj = await this.prismaService.loja.findFirst({ where: { loj_cnpj }});
    if(hasCnpj) throw new BadRequestException('Cpnj já cadastrado!');
    
    const hasNome = await this.prismaService.loja.findFirst({ where: { loj_nome }});
    if(hasNome) throw new BadRequestException('Nome já cadastrado!');

    const hasEst = await this.prismaService.estado.findUnique({ where: { est_id } })
    if (!hasEst) throw new BadRequestException("Estado não encontrado!");
    const hasCid = await this.prismaService.cidade.findFirst({ where: { est_id, cid_id } })
    if (!hasCid) throw new BadRequestException("Cidade não encontrada!");
    const hasBai = await this.prismaService.bairro.findFirst({ where: { bai_id, cid_id } })
    if (!hasBai) throw new BadRequestException("Bairro não encontrado!");

    const data: Prisma.LojaCreateInput = {
      loj_nome: createLojaDto.loj_nome,
      loj_cnpj: createLojaDto.loj_cnpj,
      loj_logo: createLojaDto.loj_logo,
      loj_slogan: createLojaDto.loj_slogan,
      loj_telefone: createLojaDto.loj_telefone,       
      loj_email: createLojaDto.loj_email,           
      loj_text_sobre: createLojaDto.loj_text_sobre,      
      loj_cep: createLojaDto.loj_cep,            
      loj_endereco: createLojaDto.loj_endereco,           
      cidades: { connect: {cid_id: createLojaDto.cid_id} },   
      bairros: { connect: {bai_id: createLojaDto.bai_id} },              
      estados: { connect: {est_id: createLojaDto.est_id} },              
      lojistas: { connect: {lojst_id: createLojaDto.lojst_id} }  
    }

    const loja = await this.prismaService.loja.create({data})

    return {
      id: loja.loj_id,
      message: "Loja cadastrada com sucesso",
      statusCode: HttpStatus.OK
    }
  }

  async findAll(params?: FiltrarLojasDto) {
    const whereClause: Prisma.LojaWhereInput = {}

    if(params?.string){
      whereClause.OR = [  
        { loj_nome: { contains: params.string.trim()} },
        { loj_cnpj: { contains: params.string.trim()} },
        { loj_email: { contains: params.string.trim()} },
        { OR: [ { estados: {
              est_nome: params.string.trim(),
              est_sigla: params.string.trim()
        } }]},
        { cidades: { cid_nome: {contains: params.string.trim()}}},
        { bairros : { bai_nome: { contains: params.string.trim()}}},
        { loj_id: +params.string || 0 }
      ]
    }

    const pagina  = ( +params?.pagina || 1 );
    const limite  = ( +params?.limite || 10 );
    const skip    = ( pagina - 1 ) * limite ;
    const take    = limite
    
    const lojas = await this.prismaService.loja.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: { loj_id: 'desc' },
      select: {
        loj_id: true,
        loj_nome: true,
        loj_logo: true,
        loj_slogan: true,
        loj_telefone: true,
        loj_email: true,
        loj_text_sobre: true,
        loj_cep: true,
        loj_endereco: true,
        loj_data_cadastro: true,
        estados:  { select: { est_nome: true }},
        cidades:  { select: {  cid_nome: true }},
        bairros:  { select: { bai_nome: true }},
        lojistas: { select: { lojst_id: true, lojst_nome: true}}
      }
    });

    const total = await this.prismaService.loja.count({ where: whereClause });

    return {
      statusCode: HttpStatus.OK,
      paginas: Math.ceil( total / limite),
      pagina,
      limite,
      total: total,
      total_resultados: lojas.length,
      resultados: lojas
    } 
  }

  async findByNome(nome: string){
    return await this.prismaService.loja.findMany({
      where: { loj_nome: nome},
      select: { loj_id: true }
    })
  }

  async findOne(id: number) {
    const data = await this.ensureLojaExists(id);
    return {
      statusCode: HttpStatus.OK,
      resultado: data
    } 
  }

  async update(id: number, updateLojaDto: UpdateLojaDto) {
    const oldLoja = await this.ensureLojaExists(id);
    const data: Prisma.LojaUpdateInput = {}

    this.validaUpdateInput(id, updateLojaDto, 'loj_nome', 'Nome já cadastrado!');
    this.validaUpdateInput(id, updateLojaDto, 'loj_cnpj', 'Cnpj já cadastrado!');
    this.validaUpdateInput(id, updateLojaDto, 'loj_email', 'E-mail já cadastrado!');

    if(updateLojaDto.hasOwnProperty('est_id')) {
      const hasEstado = await this.prismaService.estado.findFirst({ where: { est_id: updateLojaDto.est_id } })
      if(!hasEstado) throw new BadRequestException("Estado não encontrado!");
    }

    if(updateLojaDto.hasOwnProperty('cid_id')) {
      const hasCidade = await this.prismaService.cidade.findFirst({
        where: {
          est_id: updateLojaDto.est_id || oldLoja.estados.est_id,
          cid_id: updateLojaDto.cid_id
        }
      })

      if(!hasCidade) throw new BadRequestException("Cidade não encontrada!");
    }

    if(updateLojaDto.hasOwnProperty('bai_id')) {
      const hasBairro = await this.prismaService.bairro.findFirst({
        where: {
          bai_id: updateLojaDto.bai_id,
          cid_id: updateLojaDto.cid_id
        }
      })
      if(!hasBairro) throw new BadRequestException("Bairro não encontrada!");
    }

    const loja = await this.prismaService.loja.update({
      data: {...updateLojaDto},
      where: { loj_id: id }
    })

    return {
      id: loja.loj_id,
      message: 'Loja atualizada com sucesso!',
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: number) {
    const loja = await this.ensureLojaExists(id);
    await this.prismaService.loja.delete({
      where: { loj_id: id }
    })
    return {
      id: loja.loj_id,
      message: "Loja deletada com sucesso.",
      statusCode: HttpStatus.OK
    }
  }

  private async ensureLojaExists(id:number){
    const loja = await this.prismaService.loja.findUnique({
      where: {loj_id: id},
      select: {
        loj_id: true,
        loj_nome: true,
        loj_logo: true,
        loj_slogan: true,
        loj_telefone: true,
        loj_email: true,
        loj_text_sobre: true,
        loj_cep: true,
        loj_endereco: true,
        loj_data_cadastro: true,
        estados:  { select: { est_id:true, est_nome: true }},
        cidades:  { select: { cid_nome: true }},
        bairros:  { select: { bai_nome: true }},
        lojistas: { select: { lojst_id: true, lojst_nome: true}}
      }
    }) 

    if(!loja) throw new NotFoundException('Loja não encontrada.');
    return loja;

  }
  private async validaUpdateInput(id: number, updateLojaDto: UpdateLojaDto, property?: string, msgBadRequest?: string){
    if(updateLojaDto.hasOwnProperty(property)){
      const hasProperty = await this.prismaService.lojista.findFirst({
        where: { [property]: updateLojaDto[property], lojst_id: {not: id} }
      })
      if(hasProperty) throw new BadRequestException(msgBadRequest);
    }
    return 
  }
}
