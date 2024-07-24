import { LOJST_STATUS } from "../enums/lojst-status.enum";

export class CreateLojistaDto {
    lojst_id:               number; 
    lojst_nome:             string;
    lojst_cpf:              string;
    lojst_img_perfil:       string;
    lojst_telefone:         string;
    lojst_email:            string;
    lojst_data_cadastro:    Date;
    lojst_cep:              string;
    lojst_endereco:         string;
    lojst_status:           LOJST_STATUS;
    lojst_loguin
    lojst_senha_hash
    lojst_token_inspiracao
    lojst_token_recuperacao
    cid_id
    bai_id
    est_id

}
