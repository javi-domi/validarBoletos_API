import { Test, TestingModule } from '@nestjs/testing';
import { ValidateBoletoController } from './validate-boleto.controller';
import { ValidateBoletoService } from './validate-boleto.service';

describe('ValidateBoletoController', () => {
  let controller: ValidateBoletoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidateBoletoController],
      providers: [ValidateBoletoService],
    }).compile();

    controller = module.get<ValidateBoletoController>(ValidateBoletoController);
  });

  it('should return Hello Validate Boleto!', () => {
    expect(controller.getHello()).toBe('Hello ValidateBoleto!');
  });
});
