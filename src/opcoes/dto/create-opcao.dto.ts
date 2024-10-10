

import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { OpcaoDto } from "./opcao.dto";
import { Type } from "class-transformer";

export class CreateOpcaoDto {
  
    @IsNumber({}, { message: 'O ID do produto deve ser um número válido.' })
    @IsNotEmpty({ message: 'O ID do produto não pode estar vazio.' })
    prodt_id: number;
  
    @IsArray({ message: 'As opções devem ser um array.' })
    @ValidateNested({ each: true })
    @Type(() => OpcaoDto) 
    opcoes: OpcaoDto[];
  }
