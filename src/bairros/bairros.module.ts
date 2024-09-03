import { Module } from '@nestjs/common';
import { BairrosService } from './bairros.service';
import { BairrosController } from './bairros.controller';

@Module({
  controllers: [BairrosController],
  providers: [BairrosService],
})
export class BairrosModule {}
