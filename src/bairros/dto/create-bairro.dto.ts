import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBairroDto {
  @IsString()
  @IsNotEmpty()
  bai_nome: string;

  @IsNumber()
  cid_id: number;
}
