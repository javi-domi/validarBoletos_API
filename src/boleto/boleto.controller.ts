import { Controller, Get, Param } from '@nestjs/common';
import { ValidationReturn } from '../interfaces/validationReturn';
import { BoletoService } from './boleto.service';

@Controller('boleto')
export class BoletoController {
  constructor(private readonly boletoService: BoletoService) {}

  @Get('/:boleto')
  getBoletoValidation(@Param('boleto') boleto: string): ValidationReturn {
    return this.boletoService.execute(boleto);
  }
}
