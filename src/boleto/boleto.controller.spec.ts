import { Test, TestingModule } from '@nestjs/testing';
import { BoletoController } from './boleto.controller';
import { BoletoService } from './boleto.service';

jest.mock('./boleto.service');

describe('BoletoController', () => {
  let controller: BoletoController;
  let service: BoletoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletoController],
      providers: [BoletoService],
    }).compile();

    controller = module.get<BoletoController>(BoletoController);
    service = module.get<BoletoService>(BoletoService);
  });

  it('should call boleto service ', () => {
    const boleto = '21290001192110001210904475617405975870000002000';

    controller.getBoletoValidation(boleto);
    expect(service.execute).toHaveBeenCalledWith(boleto);
  });
});
