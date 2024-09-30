import { IsEnum, IsOptional, IsString } from "class-validator";
import { LOJST_STATUS } from "../enums/lojst-status.enum";

export class FiltrarLojistaDto {
    @IsOptional()
    @IsString({ message: 'O campo de busca deve ser uma string.' })
    string?: string;

    @IsOptional()
    @IsEnum(LOJST_STATUS, { message: 'O status fornecido é inválido.' })
    status?: LOJST_STATUS;

    @IsOptional()
    pagina?: String;

    @IsOptional()
    limite?: string;
}
