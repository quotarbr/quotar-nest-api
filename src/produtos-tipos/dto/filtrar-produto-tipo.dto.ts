import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class FiltrarProdutoTipoDto {
  @IsOptional()
  @IsString()
  prod_id : string;

  @IsOptional()
  @IsString()
  tp_id   : string;

  @IsOptional()
  pagina?: String;

  @IsOptional()
  limite?: string;

}
