import { IsNumber, IsOptional, IsString } from "class-validator";

export class FotoDto {
  @IsOptional()
  @IsNumber({}, { message: 'O ID da foto deve ser um número válido.' })
  ft_id?: number;
  
  @IsOptional()
  @IsString({ message: 'A src da foto deve ser uma string válida.' })
  ft_src?: string;
  
  @IsOptional()
  @IsString({ message: 'A URI da foto deve ser uma string válida.' })
  ft_uri?: string;
}