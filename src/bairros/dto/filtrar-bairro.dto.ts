import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FiltrarBairroDto {
  @IsString({ message: 'O campo de busca deve ser uma string.' })
  @IsOptional()
  string: string;

  @IsOptional()
  pagina?: String;

  @IsOptional()
  limite?: string;
}
