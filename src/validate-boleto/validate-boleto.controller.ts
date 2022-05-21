import { Controller, Get } from '@nestjs/common';
import { ValidateBoletoService } from './validate-boleto.service';

@Controller('boleto')
export class ValidateBoletoController {
  constructor(private readonly validateBoletoService: ValidateBoletoService) {}

  @Get()
  getHello(): string {
    return this.validateBoletoService.getHelloBoleto();
  }
}
