import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateBairroDto {
  @IsString({ message: 'O nome do bairro deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome do bairro não pode estar vazio.' })
  bai_nome: string;

  @IsNumber({}, { message: 'O ID da cidade deve ser um número.' })
  @Min(1, { message: 'O ID da cidade deve ser um número positivo.' })
  cid_id: number;
}
