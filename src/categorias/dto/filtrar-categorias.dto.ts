import { IsNotEmpty, IsOptional, IsString, IsInt, IsArray, IsBoolean } from 'class-validator';

export class FiltrarCategoriasDto {

  @IsOptional()
  @IsString()
  string?: string;

  @IsOptional()
  pagina?: String;

  @IsOptional()
  limite?: string;

}
