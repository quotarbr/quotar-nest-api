import { IsNotEmpty, IsString, Max, MaxLength, maxLength } from "class-validator";

export class CreateEstadoDto {
    @IsString()
    @IsNotEmpty()
    est_nome: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(2)
    est_sigla: string;
}
