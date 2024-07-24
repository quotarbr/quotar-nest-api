import { IsNotEmpty, IsString } from "class-validator";

export class CreateCidadeDto {
  @IsString()
  @IsNotEmpty()
  cid_nome: string;

  @IsString()
  est_id: number;
}
