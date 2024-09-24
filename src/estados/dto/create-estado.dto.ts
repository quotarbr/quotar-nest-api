import { IsNotEmpty, IsString, Max, MaxLength, maxLength } from "class-validator";

export class CreateEstadoDto {
    @IsString({ message: 'O nome do estado deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome do estado não pode estar vazio.' })
    est_nome: string;

    @IsString({ message: 'A sigla do estado deve ser uma string.' })
    @IsNotEmpty({ message: 'A sigla do estado não pode estar vazia.' })
    @MaxLength(2, { message: 'A sigla do estado deve ter no máximo 2 caracteres.' })
    est_sigla: string;
}