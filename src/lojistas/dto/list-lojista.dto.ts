import { Exclude } from "class-transformer";
import { LOJST_STATUS } from "../enums/lojst-status.enum";

export class ListLojistaDto {
    lojst_nome:                 string;
    lojst_cpf:                  string;
    lojst_img_perfil?:          string;
    lojst_telefone:             string;
    lojst_email:                string;
    lojst_data_cadastro:        Date;
    lojst_cep?:                 string;
    lojst_endereco?:            string;
    lojst_status:               LOJST_STATUS;
    @Exclude()
    lojst_login:                 string;
    @Exclude()
    lojst_senha_hash:           string;
    @Exclude()
    lojst_token_inspiracao:     string;
    @Exclude()
    lojst_token_recuperacao:    string;
    cid_id:                     number;
    bai_id:                     number;
    est_id:                     number;
    lojst_loja_parceira?:       string;
}
