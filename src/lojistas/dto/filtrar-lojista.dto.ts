import { LOJST_STATUS } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsInt, IsArray, IsBoolean } from 'class-validator';

export class FiltrarLojistaDto {

  @IsOptional()
  @IsString()
  string?: string;

  @IsOptional()
  @IsString()
  status?: LOJST_STATUS;

  @IsOptional()
  pagina?: String;

  @IsOptional()
  limite?: string;

  @IsOptional()
  @IsString()
  lojista?: string;

}
