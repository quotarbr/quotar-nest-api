import { LOJST_STATUS } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsInt, IsArray, IsBoolean } from 'class-validator';

export class FiltrarLojaDto {

  @IsOptional()
  @IsString()
  string?: string;

  @IsOptional()
  pagina?: String;

  @IsOptional()
  limite?: string;

  @IsOptional()
  @IsString()
  loja?: string;

}
