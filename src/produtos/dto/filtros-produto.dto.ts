import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class FiltrosDto {

  @IsOptional()
  tipo?: string;

  @IsOptional()
  loja?: string;

  @IsOptional()
  opcao?: string;

  @IsString()
  @IsOptional()
  string?: string;

  @IsOptional()
  pagina?: number;

  @IsOptional()
  limite?: number;
}
