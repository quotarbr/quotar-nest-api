import { IsArray, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from "class-validator";
import { OpcaoValor } from "./opcao-valor.dto";
import { Type } from "class-transformer";

export class CreateVarianteDto {
    
    @IsArray()
    @IsOptional()
    @IsString({each:true})
    vrnt_fotos?: string[];

    @IsNumber()
    @IsNotEmpty()
    vrnt_preco: number;

    @IsArray()
    @IsOptional()
    vrnt_opcoes?: OpcaoValor[];

    @IsNumber()
    @IsNotEmpty()
    prodt_id: number;

}
