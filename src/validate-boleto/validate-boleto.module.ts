import { Module } from '@nestjs/common';
import { ValidateBoletoController } from './validate-boleto.controller';
import { ValidateBoletoService } from './validate-boleto.service';

@Module({
  controllers: [ValidateBoletoController],
  providers: [ValidateBoletoService]
})
export class ValidateBoletoModule {}
