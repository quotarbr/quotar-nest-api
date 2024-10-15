import { Module } from '@nestjs/common';
import { OpcoesService } from './opcoes.service';
import { OpcoesController } from './opcoes.controller';
import { VariantesService } from 'src/variantes/variantes.service';

@Module({
  providers: [OpcoesService, VariantesService],
  controllers: [OpcoesController],
})
export class OpcoesModule {}
