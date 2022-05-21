import { Module } from '@nestjs/common';
import { ValidateBoletoController } from './validate-boleto/validate-boleto.controller';
import { ValidateBoletoModule } from './validate-boleto/validate-boleto.module';
import { ValidateBoletoService } from './validate-boleto/validate-boleto.service';

@Module({
  imports: [ValidateBoletoModule],
  controllers: [ValidateBoletoController],
  providers: [ValidateBoletoService],
})
export class AppModule {}
