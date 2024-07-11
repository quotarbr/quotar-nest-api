import { OpcaoDto } from "src/opcoes/dto/opcao.dto";
import { PRODT_STATUS } from "../enums/prodt-status.enum";
import { FotoDto } from "./foto.dto";
import { TipoDto } from "src/tipos/dto/tipo.dto";
import { CategoriaDto } from "src/categorias/dto/categoria.dto";

export class ReqProdutoDto {
  prodt_fotos?:      FotoDto[];
  prodt_nome:       string;       
  prodt_descricao?:  string; 
  prodt_tipo:       TipoDto; 
  prodt_status:     PRODT_STATUS; 
  prodt_categoria:  CategoriaDto; 
  prodt_opcoes:     OpcaoDto[];
}
