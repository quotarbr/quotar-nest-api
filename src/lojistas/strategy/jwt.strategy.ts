import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LojistaFromJwt } from '../dto/LojistaFromJwt';
import { LojistaPayload } from '../dto/lojista-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: LojistaPayload): Promise<LojistaFromJwt> {
    return {
      id: payload.sub,
      login: payload.login,
      name: payload.name,
    };
  }
}