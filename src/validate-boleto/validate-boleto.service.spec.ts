import { Test, TestingModule } from '@nestjs/testing';
import { ValidateBoletoService } from './validate-boleto.service';

describe('ValidateBoletoService', () => {
  let service: ValidateBoletoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateBoletoService],
    }).compile();

    service = module.get<ValidateBoletoService>(ValidateBoletoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
