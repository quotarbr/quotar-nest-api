import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, PRODT_STATUS, Produto } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FotoDto } from './dto/foto.dto';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { FiltrosDto } from './dto/filtros-produto.dto';
import { LojasService } from 'src/lojas/lojas.service';
import { TiposService } from 'src/tipos/tipos.service';
import { contains } from 'class-validator';
import { connect } from 'http2';

@Injectable()
export class ProdutosService {
  constructor(
    private prismaService: PrismaService,
    private lojasService: LojasService,
    private tiposService: TiposService,
  ) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const hasProduto = await this.prismaService.produto.findFirst({
      where: {
        prodt_nome: createProdutoDto.prodt_nome,
        loj_id: createProdutoDto.prodt_loja,
      },
    });

    if (hasProduto) throw new BadRequestException('Produto já cadastrado.');

    const data = {
      prodt_fotos: await this.uploadFotos(createProdutoDto.prodt_fotos),
      prodt_nome: createProdutoDto.prodt_nome,
      prodt_descricao: createProdutoDto.prodt_descricao,
      loj_id: createProdutoDto.prodt_loja,
      prodt_status: PRODT_STATUS.liberacao,
    };

    const produto = await this.prismaService.produto.create({ data });

    const dataProdutoTipo: Prisma.ProdutoTipoCreateInput = {
      produto: { connect: { prodt_id: produto.prodt_id} },
      tipo: { connect: { tp_id: createProdutoDto.prodt_tipo} }
    }

    const hasTipo = await this.prismaService.tipo.findFirst({ where: { tp_id: createProdutoDto.prodt_tipo } })
    if(!hasTipo) throw new BadRequestException("Tipo não cadastrado.");

    await this.prismaService.produtoTipo.create({data: dataProdutoTipo});

    return {
      id: produto.prodt_id,
      message: 'Produto criado com sucesso.',
      statusCode: HttpStatus.CREATED,
    };
  }

  async findAll(params?: FiltrosDto) {
    const whereClause: Prisma.ProdutoWhereInput = {};

    if (params?.tipo) whereClause.tipos = { some: { tp_id: +params.tipo } };
    if (params?.loja) whereClause.loj_id = +params?.loja; 
    if (params?.opcao) whereClause.opcoes = { some: { opc_id: +params?.opcao } };

    if (params?.string) {
      whereClause.OR = [
        { prodt_nome: { contains: params?.string.trim() } },
        { lojas: { loj_nome: { contains: params.string.trim() } } },
        { opcoes: { some: { opc_nome: { contains: params?.string.trim() } } } },
        { prodt_descricao: { contains: params?.string.trim() } },
        {
          tipos: {
            some: {
              tipo: {
                tp_nome: {
                  contains: params?.string.trim(),
                },
              },
            },
          },
        },
        {
          tipos: {
            some: {
              tipo: {
                categorias: {
                  some: {
                    categoria: {
                      cat_nome: {
                        contains: params?.string.trim(),
                      },
                    },
                  },
                },
              },
            },
          },
        }
      ];
    }

    const pagina  = ( +params?.pagina || 1 );
    const limite  = ( +params?.limite || 10 );
    const skip    = ( pagina - 1 ) * limite ;
    const take    = limite

    const produtos = await this.prismaService.produto.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: { prodt_id: 'desc'},
      select: {
        prodt_id: true,
        prodt_fotos: true,
        prodt_nome: true,
        tipos: {
          select: {
            tipo: {
              select: {
                tp_nome: true,
                categorias: {
                  select: {
                    categoria: {
                      select: {
                        cat_nome: true  
                      }
                    }
                  }
                }
              }
            }
          },
        },
        opcoes: {
          select: {
            opc_nome: true,
            opc_valores: true,
          },
        },
        lojas: {
          select: {
            loj_id: true,
            loj_nome: true
          }
        },
        prodt_updated_at: true
      },
    });

    const total = await this.prismaService.produto.count({ where: whereClause });

    return {
      statusCode: HttpStatus.OK,
      pagina,
      total_panigas: Math.floor( total / limite),
      limite,
      total,
      total_resultados: produtos.length,
      resultados: produtos,
    };
  }

  async findOne(id: number) {
    const produto = await this.ensureProdutoExist(id);
    return {
      resultado: produto,
      statusCode: HttpStatus.OK,
    };
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const oldProduto: Produto = await this.ensureProdutoExist(id);
    const { prodt_tipo, prodt_loja , prodt_nome, prodt_descricao } = updateProdutoDto;

    if(updateProdutoDto.hasOwnProperty('prodt_nome')){
      const hasProduto = await this.prismaService.produto.findFirst({
        where: {
          prodt_nome,
          loj_id: prodt_loja || oldProduto.loj_id,
          prodt_id: { not: id }
        }
      });
      if(hasProduto) throw new BadRequestException("Nome do produto já cadastrado.");
    }

    if(updateProdutoDto.hasOwnProperty('prodt_loja')){
      const hasLoja = await this.prismaService.loja.findFirst({ where: { loj_id: prodt_loja } })
      if(!hasLoja) throw new BadRequestException('Loja não encontrada.');
    }

    if(updateProdutoDto.hasOwnProperty('prodt_tipo')){
      const hasTipo = await this.prismaService.tipo.findFirst({ where: { tp_id: prodt_tipo } })
      if(!hasTipo) throw new BadRequestException('Tipo não encontrado.');
    }

    const data: Prisma.ProdutoUpdateInput = {
      prodt_fotos: await this.uploadFotos(updateProdutoDto.prodt_fotos),
      prodt_nome,
      prodt_descricao,
      lojas: {
        connect: {
          loj_id: updateProdutoDto.prodt_loja
        }
      },
      prodt_status: PRODT_STATUS.liberacao
    }

    const produto = await this.prismaService.produto.update({
      data,
      where: { prodt_id: id },
    });

    await this.updateProdutoTipo(oldProduto, updateProdutoDto);

    return {
      id: produto.prodt_id,
      message: "Produto atualizado com sucesso.",
      statusCode: HttpStatus.OK,
    };
  }

  async updateProdutoTipo(oldProduto: Produto, updateProdutoDto: UpdateProdutoDto ){
    const produtoTipoUpdate: Prisma.ProdutoTipoUpdateInput = {
      produto: { connect: { prodt_id: oldProduto.prodt_id}},
      tipo: {connect: { tp_id: updateProdutoDto.prodt_tipo}}
    }

    await this.prismaService.produtoTipo.update({ 
      where: {
        prod_id_tp_id: {
          prod_id: oldProduto.prodt_id,
          tp_id: updateProdutoDto.prodt_tipo
        }
      },
      data: produtoTipoUpdate
    });
  }

  async remove(id: number) {
    const produto = await this.ensureProdutoExist(id);

    await this.prismaService.produto.delete({
      where: { prodt_id: id },
    });
    return {
      id: produto.prodt_id,
      message: 'Produto deletado com sucesso.',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  private async ensureProdutoExist(id: number) {
    const produto = await this.prismaService.produto.findUnique({
      where: {
        prodt_id: id,
      },
      include: {
        variantes: {
          select: {
            prodt_id: true,
            vrnt_fotos: true,
            vrnt_preco: true,
            tipos_precos: {
              select: {
                tp_prec_id: true,
                tp_prec_nome: true,
              },
            },
            opcoes: {
              select:{
                opcao: {
                  select: {
                    opc_nome: true,
                    opc_valores: true
                  }
                }
              }
            }
          },
        },
      },
    });
    if (!produto) throw new BadRequestException('Produto não encontrado');
    return produto;
  }

  private async uploadFotos(prodt_fotos: FotoDto[]) {
    //tratar de base64 para string ?? o que vai ser e como
    const fotosTratadas = [];
    return JSON.stringify(fotosTratadas);
  }
}
