import { Controller, Get } from '@nestjs/common';
import { BoletoService } from './boleto.service';

@Controller('boleto')
export class BoletoController {
  constructor(private readonly BoletoService: BoletoService) {}

  @Get()
  getHello(): string {
    return this.BoletoService.getHelloBoleto();
  }
}
