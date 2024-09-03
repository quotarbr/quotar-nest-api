import { IsNotEmpty, IsString, MaxLength, maxLength } from "class-validator";

export class CreateEstadoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(2)
    est_nome: string;
}
