import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
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
    @IsDate()
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
    lojst_login: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: `Senha muito fraca.
    
    A senha deve conter:
      - Pelo menos uma letra maiúscula
      - Pelo menos uma letra minúscula
      - Um número ou caractere especial
    
    Não pode conter ponto (.) ou nova linha.`,
    })
    @IsNotEmpty()
    lojst_senha: string;

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
