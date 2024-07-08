import { PartialType } from '@nestjs/mapped-types';
import { CreateOpcoeDto } from './create-opcoe.dto';

export class UpdateOpcoeDto extends PartialType(CreateOpcoeDto) {}
