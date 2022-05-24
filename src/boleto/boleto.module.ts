import { Module } from '@nestjs/common';
import { BoletoController } from './boleto.controller';
import { BoletoService } from './boleto.service';

@Module({
  controllers: [BoletoController],
  providers: [BoletoService],
})
export class BoletoModule {}
