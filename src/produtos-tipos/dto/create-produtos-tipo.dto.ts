import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateProdutoTipoDto {
  
  @IsNotEmpty()
  @IsNumber()
  prod_id : number;

  @IsNotEmpty()
  @IsNumber()
  tp_id   : number;

}
