import { IsNotEmpty, IsString } from "class-validator";

export class LojistaLoginDto {

  @IsString()
  @IsNotEmpty()
  lojst_login: string

  @IsString()
  @IsNotEmpty()
  lojst_senha: string
}
