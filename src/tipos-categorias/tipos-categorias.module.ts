import { Module } from '@nestjs/common';
import { TiposCategoriasService } from './tipos-categorias.service';
import { TiposCategoriasController } from './tipos-categorias.controller';

@Module({
  controllers: [TiposCategoriasController],
  providers: [TiposCategoriasService],
})
export class TiposCategoriasModule {}
