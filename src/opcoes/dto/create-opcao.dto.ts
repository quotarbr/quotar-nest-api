

import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOpcaoDto {

    @IsString()
    @IsNotEmpty()
    opc_nome: string;
    
    @IsString()
    @IsNotEmpty()
    opc_valores: string;
    
    @IsNumber()
    @IsNotEmpty()
    prodt_id: number;
}
