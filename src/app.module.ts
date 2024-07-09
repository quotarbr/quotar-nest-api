import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { PrismaModule } from './prisma/prisma.module';
import { OpcoesModule } from './opcoes/opcoes.module';
import { LojasModule } from './lojas/lojas.module';
import { TiposModule } from './tipos/tipos.module';
import { TiposPrecosModule } from './tipos_precos/tipos_precos.module';
import { VariantesModule } from './variantes/variantes.module';

@Module({
  imports: [ProdutosModule, PrismaModule, OpcoesModule, VariantesModule, TiposPrecosModule, TiposModule, LojasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
