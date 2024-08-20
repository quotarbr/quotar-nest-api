import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { FotoDto } from "./foto.dto";

export class FiltrosDto {

  @IsNumber()
  @IsOptional()
  tipo?: number;

  @IsNumber()
  @IsOptional()
  loja?: number;

  @IsNumber()
  @IsOptional()
  opcao?: number;

  @IsString()
  @IsOptional()
  string?: string;
}
