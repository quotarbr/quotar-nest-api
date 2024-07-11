import { CreateOpcaoDto } from "src/opcoes/dto/create-opcao.dto";
import { CreateTiposPrecoDto } from "src/tipos_precos/dto/create-tipos_preco.dto";
import { CreateVarianteDto } from "src/variantes/dto/create-variante.dto";
import { PRODT_STATUS } from "../enums/prodt-status.enum";
import { TipoDto } from "src/tipos/dto/tipo.dto";
import { CreateLojaDto } from "src/lojas/dto/create-loja.dto";
import { FotoDto } from "./foto.dto";

export class CreateProdutoDto {
  prodt_fotos?:      FotoDto[];
  prodt_nome:       string;       
  prodt_descricao?:  string; 
  prodt_tipo:       TipoDto; 
  prodt_status:     PRODT_STATUS; 
}