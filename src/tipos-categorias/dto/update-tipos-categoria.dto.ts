import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposCategoriaDto } from './create-tipos-categoria.dto';

export class UpdateTiposCategoriaDto extends PartialType(CreateTiposCategoriaDto) {}
