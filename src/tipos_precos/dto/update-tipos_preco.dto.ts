import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposPrecoDto } from './create-tipos_preco.dto';

export class UpdateTiposPrecoDto extends PartialType(CreateTiposPrecoDto) {}
