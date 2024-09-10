import { IsOptional, IsString } from "class-validator";
import { LOJST_STATUS } from "../enums/lojst-status.enum";

export class FiltrarLojistaDto {
    @IsOptional()
    @IsString()
    string?: string;

    @IsOptional()
    @IsString()
    status?: LOJST_STATUS;

    @IsOptional()
    pagina?: String;

    @IsOptional()
    limite?: string;

    @IsOptional()
    @IsString()
    lojista?: string;
}
