import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { LOJST_STATUS } from "../enums/lojst-status.enum";

export class CreateLojistaDto {
    @IsString({ message: 'O nome deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
    lojst_nome: string;

    @IsString({ message: 'O CPF deve ser uma string.' })
    @IsNotEmpty({ message: 'O CPF não pode estar vazio.' })
    @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, { message: 'O CPF deve estar no formato XXX.XXX.XXX-XX ou XXXXXXXXXXX.' })
    lojst_cpf: string;

    @IsString({ message: 'A imagem de perfil deve ser uma string.' })
    @IsOptional()
    lojst_img_perfil?: string;

    @IsPhoneNumber(null ,{ message: 'O telefone deve ser um número válido no formato +55XXXXXXXXXXX (código do país seguido do número).' })
    @IsNotEmpty({ message: 'O telefone não pode estar vazio.' })
    lojst_telefone: string;

    @IsEmail({}, { message: 'O e-mail deve ser um endereço válido.' })
    @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
    lojst_email: string;

    // @IsDate({ message: 'A data de cadastro deve ser uma data válida.' })
    // @IsOptional()
    // lojst_data_cadastro: Date;

    @IsOptional()
    @Matches(/^\d{5}-\d{3}$|^\d{8}$/, { message: 'O CEP deve estar no formato XXXXX-XXX ou XXXXXXXXX.' })
    lojst_cep?: string;

    @IsString({ message: 'O endereço deve ser uma string.' })
    @IsNotEmpty({ message: 'O endereço não pode estar vazio.' })
    lojst_endereco?: string;
    
    @IsString({ message: 'O status deve ser uma string.' })
    @IsOptional()
    @IsEnum(LOJST_STATUS, { message: 'O status deve ser um valor válido do enum LOJST_STATUS.' })
    lojst_status: LOJST_STATUS;

    @IsString({ message: 'O login deve ser uma string.' })
    @IsNotEmpty({ message: 'O login não pode estar vazio.' })
    lojst_login: string;

    @IsString({message: 'A senha deve ser uma string'})
    @MinLength(4, { message: 'A senha deve ter pelo menos 4 caracteres.' })
    @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres.' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: `Senha muito fraca. A senha deve conter:
        - Pelo menos uma letra maiúscula
        - Pelo menos uma letra minúscula
        - Um número ou caractere especial 
        - Não pode conter ponto (.) ou nova linha.`,
    })
    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    lojst_senha: string;

    @IsNumber({}, { message: 'O ID da cidade deve ser um número.' })
    @IsNotEmpty({ message: 'O ID da cidade não pode estar vazio.' })
    cid_id: number;

    @IsNumber({}, { message: 'O ID do bairro deve ser um número.' })
    @IsNotEmpty({ message: 'O ID do bairro não pode estar vazio.' })
    bai_id: number;

    @IsNumber({}, { message: 'O ID do estado deve ser um número.' })
    @IsNotEmpty({ message: 'O ID do estado não pode estar vazio.' })
    est_id: number;

    @IsOptional()
    lojst_loja_parceira?: string;

}