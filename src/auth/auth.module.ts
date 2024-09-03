import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { LojistasService } from 'src/lojistas/lojistas.service';
import { LojistasModule } from 'src/lojistas/lojistas.module';

@Module({
  imports: [LojistasModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy ]
})
export class AuthModule {}
