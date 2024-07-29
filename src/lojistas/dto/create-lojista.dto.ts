import { IsNotEmpty } from "class-validator";
import { LOJST_STATUS } from "../enums/lojst-status.enum";
import { Exclude } from 'class-transformer';

export class CreateLojistaDto {
    @IsNotEmpty()
    lojst_nome:                 string;

    @IsNotEmpty()
    lojst_cpf:                  string;

    lojst_img_perfil?:          string;

    @IsNotEmpty()
    lojst_telefone:             string;

    @IsNotEmpty()
    lojst_email:                string;

    @IsNotEmpty()
    lojst_data_cadastro:        Date;

    lojst_cep?:                 string;
    lojst_endereco?:            string;

    @IsNotEmpty()
    lojst_status:               LOJST_STATUS;

    @IsNotEmpty()
    lojst_loguin:               string;

    @IsNotEmpty()
    lojst_senha_hash:           string;

    lojst_token_inspiracao?:     string;

    lojst_token_recuperacao?:    string;

    @IsNotEmpty()
    cid_id:                     number;

    @IsNotEmpty()
    bai_id:                     number;
    
    @IsNotEmpty()
    est_id:                     number;

    lojst_loja_parceira?:       string;
}
