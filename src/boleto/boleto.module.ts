import { Module } from '@nestjs/common';
import { BoletoHelpers } from 'src/helpers/helpers';
import { BoletoController } from './boleto.controller';
import { BoletoService } from './boleto.service';

@Module({
  imports: [BoletoHelpers],
  controllers: [BoletoController],
  providers: [BoletoService],
})
export class BoletoModule {}
