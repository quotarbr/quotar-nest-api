import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { FotoDto } from "./foto.dto";
import { PRODT_STATUS } from "@prisma/client";

export class CreateProdutoDto {

  @IsOptional()
  prodt_fotos?: FotoDto[];
  
  @IsString({ message: 'O nome do produto deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O nome do produto é obrigatório.' })
  prodt_nome: string;
  
  @IsString({ message: 'A descrição do produto deve ser uma string válida.' })
  @IsOptional()
  prodt_descricao?: string;
  
  // @IsEnum(PRODT_STATUS, { message: 'O status do produto deve ser um dos seguintes: ativo, liberacao ou inativo.' })
  // @IsOptional()
  // prodt_status?: PRODT_STATUS;
  
  @IsNumber({}, { message: 'O ID da loja deve ser um número válido.' })
  @IsNotEmpty({ message: 'O ID da loja é obrigatório.' })
  prodt_loja: number;
  
  @IsNumber({}, { message: 'O ID do tipo deve ser um número válido.' })
  @IsNotEmpty({ message: 'O ID do tipo é obrigatório.' })
  prodt_tipo: number; 
}
