import { PartialType } from '@nestjs/mapped-types';
import { CreateOpcaoDto } from './create-opcao.dto';

export class UpdateOpcoeDto extends PartialType(CreateOpcaoDto) {}
