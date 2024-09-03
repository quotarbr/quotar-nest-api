import { Module } from '@nestjs/common';
import { TiposPrecosService } from './tipos_precos.service';
import { TiposPrecosController } from './tipos_precos.controller';

@Module({
  controllers: [TiposPrecosController],
  providers: [TiposPrecosService],
})
export class TiposPrecosModule {}
