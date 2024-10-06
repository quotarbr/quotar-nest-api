import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Matches } from "class-validator"

export class CreateLojaDto {
           
  @IsString({ message: 'O nome da loja deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O nome da loja não pode estar vazio.' })
  loj_nome: string;

  @IsString({ message: 'O CNPJ deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O CNPJ não pode estar vazio.' })
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, { message: 'O CNPJ deve seguir o formato XX.XXX.XXX/XXXX-XX.' })
  loj_cnpj: string;

  @IsString({ message: 'A logo da loja deve ser uma string válida.' })
  @IsOptional()
  loj_logo?: string;
  
  @IsString({ message: 'O slogan da loja deve ser uma string válida.' })
  @IsOptional()
  loj_slogan?: string;

  @IsPhoneNumber(null ,{ message: 'O telefone deve ser um número válido no formato +55XXXXXXXXXXX.' })
  @IsNotEmpty({ message: 'O telefone não pode estar vazio.' })
  loj_telefone: string;

  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido.' })
  loj_email: string;

  @IsString({ message: 'O texto sobre a loja deve ser uma string válida.' })
  @IsOptional()
  loj_text_sobre?: string;

  @IsNotEmpty({ message: 'O CEP não pode estar vazio.' })
  @Matches(/^\d{5}-\d{3}$|^\d{8}$/, { message: 'O CEP deve estar no formato XXXXX-XXX ou XXXXXXXXX.' })
  loj_cep: string

  @IsString({ message: 'O endereço da loja deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O endereço não pode estar vazio.' })
  loj_endereco: string         
   
  @IsNumber({}, { message: 'O ID da cidade deve ser um número válido.' })
  @IsNotEmpty({ message: 'O ID da cidade não pode estar vazio.' })
  cid_id: number

  @IsNumber({}, { message: 'O ID do bairro deve ser um número válido.' })
  @IsNotEmpty({ message: 'O ID do bairro não pode estar vazio.' })
  bai_id: number

  @IsNumber({}, { message: 'O ID do estado deve ser um número válido.' })
  @IsNotEmpty({ message: 'O ID do estado não pode estar vazio.' })
  est_id: number

  @IsNumber({}, { message: 'O ID do lojista da loja deve ser um número válido.' })
  @IsNotEmpty({ message: 'O ID do lojista da loja não pode estar vazio.' })
  lojst_id: number

}
