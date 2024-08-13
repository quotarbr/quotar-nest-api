import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCidadeDto {
  @IsString()
  @IsNotEmpty()
  cid_nome: string;

  @IsNumber()
  est_id: number;
}
