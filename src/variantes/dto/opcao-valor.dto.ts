import { IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from "class-validator";

export class OpcaoValor {

    @IsNumber()
    @IsNotEmpty()
    opc_id: number;

    @IsString()
    @IsNotEmpty()
    opc_nome: string;
    
    @IsString()
    @IsNotEmpty()
    opc_valor: string;
            
}