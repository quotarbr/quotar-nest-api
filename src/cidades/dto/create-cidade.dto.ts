import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateCidadeDto {
  @IsString({ message: 'O nome da cidade deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome da cidade não pode estar vazio.' })
  @MaxLength(100, { message: 'O nome da cidade deve ter no máximo 100 caracteres.' })
  cid_nome: string;

  @IsNumber({}, { message: 'O ID do estado deve ser um número.' })
  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  @Min(1, { message: 'O ID do estado deve ser um número positivo.' })
  est_id: number;
}
