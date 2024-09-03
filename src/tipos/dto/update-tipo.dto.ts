import { PartialType } from '@nestjs/mapped-types';
import { TipoDto } from './tipo.dto';

export class UpdateTipoDto extends PartialType(TipoDto) {}
