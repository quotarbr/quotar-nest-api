import { CreateOpcoeDto } from "src/opcoes/dto/create-opcoe.dto";
import { CreateTiposPrecoDto } from "src/tipos_precos/dto/create-tipos_preco.dto";
import { CreateVarianteDto } from "src/variantes/dto/create-variante.dto";
import { PRODT_STATUS } from "../enums/prodt-status.enum";
import { CreateTipoDto } from "src/tipos/dto/create-tipo.dto";
import { CreateLojaDto } from "src/lojas/dto/create-loja.dto";

export class CreateProdutoDto {
  prodt_fotos:      string;
  prodt_nome:       string;       
  prodt_descricao:  string;  
  prodt_created_at: Date;
  prodt_updated_at: Date;   
  prodt_status:     PRODT_STATUS;
  prodt_loja:       CreateLojaDto;
  prodt_tipo:       CreateTipoDto;
  prodt_opcoes:     CreateOpcoeDto[];
  prodt_tp_preco:   CreateTiposPrecoDto;                  
  prodt_variants:   CreateVarianteDto[];
}
