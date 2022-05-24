import { Injectable } from '@nestjs/common';

@Injectable()
export class BoletoService {
  getHelloBoleto(): string {
    return 'Hello ValidateBoleto!';
  }
}
