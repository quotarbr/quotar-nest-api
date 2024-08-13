

import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOpcaoDto {

    @IsString()
    @IsNotEmpty()
    opc_nome: string;
    
    @IsString()
    @IsNotEmpty()
    opc_valores: string;
    
    @IsNumber()
    @IsOptional()
    prodt_id?: number;
}
