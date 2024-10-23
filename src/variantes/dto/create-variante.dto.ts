import { IsArray, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from "class-validator";
import { OpcaoValor } from "./opcao-valor.dto";
import { Type } from "class-transformer";

export class CreateVarianteDto {
    
    @IsArray()
    @IsOptional()
    @IsString({each:true})
    vrnt_fotos?: string;

    @IsNumber()
    @IsNotEmpty()
    vrnt_preco: number;

    @IsNumber()
    @IsNotEmpty()
    prodt_id: number;

    @IsNumber()
    @IsNotEmpty()
    tp_prec_id: number;

    @IsArray()
    vrnt_opcoes: OpcaoValor[];

}
