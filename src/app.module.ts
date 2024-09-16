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
import { CategoriasModule } from './categorias/categorias.module';
import { EstadosModule } from './estados/estados.module';
import { CidadesModule } from './cidades/cidades.module';
import { BairrosModule } from './bairros/bairros.module';
import { LojistasModule } from './lojistas/lojistas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProdutosTiposModule } from './produtos-tipos/produtos-tipos.module';
import { TiposCategoriasModule } from './tipos-categorias/tipos-categorias.module';

@Module({
  imports: [ProdutosModule, PrismaModule, OpcoesModule, VariantesModule, TiposPrecosModule, TiposModule, LojasModule, CategoriasModule, EstadosModule, CidadesModule, BairrosModule, LojistasModule, UsuariosModule, ProdutosTiposModule, TiposCategoriasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
