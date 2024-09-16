import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoTipoDto } from './create-produtos-tipo.dto';

export class UpdateProdutosTipoDto extends PartialType(CreateProdutoTipoDto) {}
