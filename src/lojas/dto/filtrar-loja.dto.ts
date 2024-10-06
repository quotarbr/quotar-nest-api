import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class FiltrarLojasDto {
           
  @IsOptional()
  @IsString({ message: 'O campo de busca deve ser uma string.' })
  string: string
  
  @IsOptional()
  pagina?: String;

  @IsOptional()
  limite?: string;

}
