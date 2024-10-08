import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FiltrarCidadeDto {
  @IsString()
  @IsOptional()
  string: string;

  @IsOptional()
  pagina?: String;

  @IsOptional()
  limite?: string;

}
