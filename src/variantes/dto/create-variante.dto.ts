import { IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from "class-validator";
import { OpcaoValor } from "./opcao-valor.dto";

export class CreateVarianteDto {
    
    @IsString()
    @IsOptional()
    vrnt_fotos?: string;

    @IsNumber()
    @IsNotEmpty()
    vrnt_preco: number;

    @IsString()
    @IsOptional()
    vrnt_opcoes?: OpcaoValor[];

    @IsNumber()
    @IsNotEmpty()
    prodt_id: number;

    @IsNumber()
    @IsNotEmpty()
    tp_prec_id: number;

}
