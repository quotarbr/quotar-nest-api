import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class TipoDto {
    @IsString()
    @IsNotEmpty()
    tp_nome: string;
    
    @IsNumber()
    @IsNotEmpty()
    cat_id: number;
}
