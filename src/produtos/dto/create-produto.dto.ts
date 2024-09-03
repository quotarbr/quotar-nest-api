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
  loj_id:       number;
  
  @IsNumber()
  @IsNotEmpty()
  tp_id:       number; 

  @IsString()
  @IsNotEmpty()
  tp_prec_nome:  string; 
}
