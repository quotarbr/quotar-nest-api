import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { USR_STATUS } from "./usr-status.enum"

export class CreateUsuarioDto {
  
  usr_nome?: string;
  usr_cpf?: string;
  usr_img_perfil?: string;
  usr_telefone?: string;

  @IsEmail()
  @IsNotEmpty()
  usr_email?: string;
  
  usr_data_cadastro?: Date;
  usr_cep?: string;
  usr_endereco?: string;
  usr_status?: string;
  cid_id?: number;
  bai_id?: number;
  est_id?: number;
  usr_prod_favoritos?: string;
  usr_loj_favoritas?: string;

  @IsString()
  @IsNotEmpty()
  usr_senha?: string;
  usr_token_inspiracao?: string;
  usr_token_recuperacao?: string;

}
