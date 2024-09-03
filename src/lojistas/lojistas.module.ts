import { Module } from '@nestjs/common';
import { LojistasService } from './lojistas.service';
import { LojistasController } from './lojistas.controller';

@Module({
  controllers: [LojistasController],
  providers: [LojistasService],
})
export class LojistasModule {}
