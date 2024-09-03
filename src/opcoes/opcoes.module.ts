import { Module } from '@nestjs/common';
import { OpcoesService } from './opcoes.service';
import { OpcoesController } from './opcoes.controller';

@Module({
  providers: [OpcoesService],
  controllers: [OpcoesController],
})
export class OpcoesModule {}
