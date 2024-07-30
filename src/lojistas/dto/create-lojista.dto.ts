import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { LOJST_STATUS } from "../enums/lojst-status.enum";
import { Exclude, Transform } from 'class-transformer';

export class CreateLojistaDto {
    @IsString()
    @IsNotEmpty()
    lojst_nome: string;

    @IsString()
    @IsNotEmpty()
    lojst_cpf: string;

    @IsString()
    @IsOptional()
    lojst_img_perfil?: string;

    @IsString()
    @IsNotEmpty()
    lojst_telefone: string;

    @IsEmail()
    @IsNotEmpty()
    lojst_email: string;

    @IsOptional()
    lojst_data_cadastro: Date;

    @IsString()
    @IsOptional()
    lojst_cep?: string;

    @IsString()
    @IsOptional()
    lojst_endereco?: string;
    
    @IsString()
    @IsOptional()
    lojst_status: LOJST_STATUS;

    @IsString()
    @IsNotEmpty()
    lojst_loguin: string;

    @IsString()
    @IsNotEmpty()
    lojst_senha_hash: string;

    @IsString()
    @IsOptional()
    lojst_token_inspiracao?: string;

    @IsString()
    @IsOptional()
    lojst_token_recuperacao?: string;

    @IsNumber()
    @IsNotEmpty()
    cid_id: number;

    @IsNumber()
    @IsNotEmpty()
    bai_id: number;

    @IsNumber()
    @IsNotEmpty()
    est_id: number;

    @IsString()
    @IsOptional()
    lojst_loja_parceira?: string;
}
