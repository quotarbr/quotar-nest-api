

import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOpcaoDto {

    @IsString({ message: 'O nome da opção deve ser uma string válida.' })
    @IsNotEmpty({ message: 'O nome da opção não pode estar vazio.' })
    opc_nome: string;

    @IsString({ message: 'Os valores da opção devem ser uma string válida.' })
    @IsNotEmpty({ message: 'Os valores da opção não podem estar vazios.' })
    opc_valores: string;

    @IsNumber({}, { message: 'O ID do produto deve ser um número válido.' })
    @IsNotEmpty({ message: 'O ID do produto não pode estar vazio.' })
    prodt_id: number;
}
