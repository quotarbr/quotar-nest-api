import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { FotoDto } from "./foto.dto";

export class CreateProdutoDto {

  @IsOptional()
  prodt_fotos?:     FotoDto[];
  
  @IsString()
  @IsNotEmpty()
  prodt_nome:       string;       
  
  @IsString()
  @IsOptional()
  prodt_descricao?: string; 
  
  @IsString()
  @IsOptional()
  prodt_status?:    string; 
  
  @IsNumber()
  @IsNotEmpty()
  prodt_loja:       number;
  
  @IsNumber()
  @IsNotEmpty()
  prodt_tipo:       number; 
}
