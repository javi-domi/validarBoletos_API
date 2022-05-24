import { Test, TestingModule } from '@nestjs/testing';
import { BoletoService } from './boleto.service';

describe('Validate Boleto Service', () => {
  let service: BoletoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoletoService],
    }).compile();

    service = module.get<BoletoService>(BoletoService);
  });

  it('Should execute bank flow if the code have 47 digits', () => {
    const boletoBancario = jest.spyOn(service, 'boletoBancario');
    const concessionaria = jest.spyOn(service, 'concessionaria');
    const result = service.execute(
      '21290001192110001210904475617405975870000002000',
    );
    expect(result.barCode.length).toBe(44);
    expect(boletoBancario).toHaveBeenCalledTimes(1);
    expect(concessionaria).toHaveBeenCalledTimes(0);
  });

  it('Should execute concessionary flow if the code have 48 digits', () => {
    const boletoBancario = jest.spyOn(service, 'boletoBancario');
    const concessionaria = jest.spyOn(service, 'concessionaria');
    const result = service.execute(
      '836300000053157800863019653978624019100220176190',
    );
    expect(result.barCode.length).toBe(44);
    expect(boletoBancario).toHaveBeenCalledTimes(0);
    expect(concessionaria).toHaveBeenCalledTimes(1);
  });
});
