import { Module } from '@nestjs/common';
import { OpcoesService } from './opcoes.service';

@Module({
  providers: [OpcoesService],
})
export class OpcoesModule {}
