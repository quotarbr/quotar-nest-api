import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateLojaDto {
           
  @IsString()
  @IsNotEmpty()
  loj_nome: string

  @IsString()
  @IsNotEmpty()
  loj_cnpj: string

  @IsString()
  @IsOptional()
  loj_logo?: string

  @IsString()
  @IsOptional()
  loj_slogan?: string

  @IsString()
  @IsNotEmpty()
  loj_telefone: string

  @IsString()
  @IsNotEmpty()
  loj_email: string

  @IsString()
  @IsOptional()
  loj_text_sobre?: string

  @IsString()
  @IsNotEmpty()
  loj_cep: string

  @IsString()
  @IsNotEmpty()
  loj_endereco: string
       
  @IsDate()
  @IsOptional()
  loj_data_cadastro: Date           
   
  @IsNumber()
  @IsNotEmpty()
  cid_id: number

  @IsNumber()
  @IsNotEmpty()
  bai_id: number

  @IsNumber()
  @IsNotEmpty()
  est_id: number

  @IsNumber()
  @IsNotEmpty()
  lojst_id: number

}
