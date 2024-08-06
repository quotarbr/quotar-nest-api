import { PartialType } from '@nestjs/mapped-types';
import { ReqProdutoDto } from './req-produto.dto';

export class UpdateProdutoDto extends PartialType(ReqProdutoDto) {}
