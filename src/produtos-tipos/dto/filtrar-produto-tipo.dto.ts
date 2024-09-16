import { IsNotEmpty, IsString } from "class-validator";

export class FiltrarProdutoTipoDto {
  @IsNotEmpty()
  @IsString()
  prod_id : string;

  @IsNotEmpty()
  @IsString()
  tp_id   : string;
}
