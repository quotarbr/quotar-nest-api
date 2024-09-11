import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FiltrarBairroDto {
  @IsString()
  @IsNotEmpty()
  string: string;

  @IsOptional()
  pagina?: String;

  @IsOptional()
  limite?: string;
}
