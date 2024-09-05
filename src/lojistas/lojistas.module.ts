import { Module } from '@nestjs/common';
import { LojistasService } from './lojistas.service';
import { LojistasController } from './lojistas.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [LojistasController],
  providers: [LojistasService, JwtStrategy],
  exports: [LojistasService]
})
export class LojistasModule {}
