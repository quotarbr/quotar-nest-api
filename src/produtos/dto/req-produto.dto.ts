import { PRODT_STATUS } from "../enums/prodt-status.enum";
import { FotoDto } from "./foto.dto";
import { TipoDto } from "src/tipos/dto/tipo.dto";
import { CategoriaDto } from "src/categorias/dto/categoria.dto";
import { CreateOpcaoDto } from "src/opcoes/dto/create-opcao.dto";

export class ReqProdutoDto {
  prodt_fotos?:     FotoDto[];
  prodt_nome:       string;       
  prodt_descricao?: string; 
  prodt_tipo:       number; 
  prodt_categoria:  CategoriaDto; 
  prodt_opcoes:     CreateOpcaoDto[];
  prodt_status?:    PRODT_STATUS; 
  prodt_loja:       number;
}
