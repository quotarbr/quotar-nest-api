import { IsNumber, IsString } from "class-validator";

export class FotoDto {
  @IsNumber()
  ft_id?: number;
  
  @IsString()
  ft_src?: string;
  
  @IsString()
  ft_uri?: string;
}