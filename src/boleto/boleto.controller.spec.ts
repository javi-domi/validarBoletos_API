import { Test, TestingModule } from '@nestjs/testing';
import { BoletoController } from './boleto.controller';
import { BoletoService } from './boleto.service';

describe('BoletoController', () => {
  let controller: BoletoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletoController],
      providers: [BoletoService],
    }).compile();

    controller = module.get<BoletoController>(BoletoController);
  });

  it('should return Hello Validate Boleto!', () => {
    expect(controller.getHello()).toBe('Hello ValidateBoleto!');
  });
});
