import { Module } from '@nestjs/common';
import { BoletoController } from './boleto/boleto.controller';
import { BoletoModule } from './boleto/boleto.module';
import { BoletoService } from './boleto/boleto.service';

@Module({
  imports: [BoletoModule],
  controllers: [BoletoController],
  providers: [BoletoService],
})
export class AppModule {}
