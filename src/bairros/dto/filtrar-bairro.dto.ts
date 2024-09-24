import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FiltrarBairroDto {
  @IsString()
  @IsOptional()
  string: string;

  @IsOptional()
  pagina?: String;

  @IsOptional()
  limite?: string;
}
