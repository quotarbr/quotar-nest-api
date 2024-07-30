import { IsNotEmpty, IsOptional } from "class-validator";
import { LOJST_STATUS } from "../enums/lojst-status.enum";
import { Exclude } from 'class-transformer';

export class CreateLojistaDto {

    @IsNotEmpty()
    lojst_nome: string;

    @IsNotEmpty()
    lojst_cpf: string;

    @IsOptional()
    lojst_img_perfil?: string;

    @IsNotEmpty()
    lojst_telefone: string;

    @IsNotEmpty()
    lojst_email: string;

    @IsOptional()
    lojst_data_cadastro: Date;

    @IsOptional()
    lojst_cep?: string;

    @IsOptional()
    lojst_endereco?: string;

    @IsOptional()
    lojst_status: LOJST_STATUS;

    @IsNotEmpty()
    lojst_loguin: string;

    @IsNotEmpty()
    lojst_senha_hash: string;

    @IsOptional()
    lojst_token_inspiracao?: string;

    @IsOptional()
    lojst_token_recuperacao?: string;

    @IsNotEmpty()
    cid_id: number;

    @IsNotEmpty()
    bai_id: number;
    
    @IsNotEmpty()
    est_id: number;

    @IsOptional()
    lojst_loja_parceira?: string;
}
