import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

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

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit?: number;
}
