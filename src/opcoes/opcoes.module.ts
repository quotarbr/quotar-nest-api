import { Module } from '@nestjs/common';
import { OpcoesService } from './opcoes.service';
import { OpcoesController } from './opcoes.controller';

@Module({
  controllers: [OpcoesController],
  providers: [OpcoesService],
})
export class OpcoesModule {}
