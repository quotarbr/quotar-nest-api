import { IsNotEmpty, IsOptional, IsString, Max, MaxLength, maxLength } from "class-validator";

export class FiltrarEstadoDto {
   
    @IsOptional()
    @IsString()
    string?: string;

    @IsOptional()
    pagina?: String;

    @IsOptional()
    limite?: string;
}
