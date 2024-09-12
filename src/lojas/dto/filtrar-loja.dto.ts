import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class FiltrarLojasDto {
           
  @IsString()
  @IsNotEmpty()
  string: string
  
  @IsOptional()
  pagina?: String;

  @IsOptional()
  limite?: string;

}
