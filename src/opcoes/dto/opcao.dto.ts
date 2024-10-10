

import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class OpcaoDto {
  
    @IsNumber({}, {message: 'O ID da opção deve ser um número válido.'})
    @IsOptional()
    opc_id?: number

    @IsString({ message: 'O nome da opção deve ser uma string válida.' })
    @IsNotEmpty({ message: 'O nome da opção não pode estar vazio.' })
    opc_nome: string;
  
    @IsNotEmpty({ message: 'Os valores da opção não podem estar vazios.' })
    opc_valores: string[];
}
