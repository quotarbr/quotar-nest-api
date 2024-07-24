import { IsNotEmpty, IsString } from "class-validator";

export class CreateBairroDto {
  @IsString()
  @IsNotEmpty()
  bai_nome: string;

  @IsString()
  cid_id: number;
}
