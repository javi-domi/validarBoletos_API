import { BadRequestException } from '@nestjs/common';
import { BoletoHelpers } from './helpers';

describe('Test helpers to parse a boleto', () => {
  it('generateVerifyNumber should return true if the verifyDigit is right', () => {
    expect(BoletoHelpers.generateVerifyNumber('84670000001')).toBe(7);
    expect(
      BoletoHelpers.generateVerifyNumber(
        '846' + '0000001435900240200240500024384221010811',
      ),
    ).toBe(7);
    expect(BoletoHelpers.generateVerifyNumber('100220176190')).toBe(0);
  });

  it("verifyFieldWithDigit should throw an erro if the verifyDigit isn't right", () => {
    BoletoHelpers.verifyFieldWithDigit({
      code: '84670000001',
      digit: 7,
      field: 'fisrt',
    });
    const err = () =>
      BoletoHelpers.verifyFieldWithDigit({
        code: '84670000001',
        digit: 6,
        field: 'fisrt',
      });
    expect(err).toThrow(BadRequestException);
  });

  it("verifyOurNumberDigit should throw an erro if the verifyDigit isn't right", () => {
    BoletoHelpers.verifyOurNumberDigit({ code: '04475617405', digit: 9 });
  });

  it('splitBankBoleto should return 5 fileds', () => {
    const [firstField, secondField, thirdField, fourthField, fifthField] =
      BoletoHelpers.splitBankBoleto(
        '21290001192110001210904475617405975870000002000',
      );
    expect(firstField.length).toBe(10);
    expect(secondField.length).toBe(11);
    expect(thirdField.length).toBe(11);
    expect(fourthField.length).toBe(1);
    expect(fifthField.length).toBe(14);
  });

  it('splitConcessionaryBoleto should return 4 fields', () => {
    expect(
      BoletoHelpers.splitConcessionaryBoleto(
        '846700000017435900240209024050002435842210108119',
      ).length,
    ).toBe(4);
  });

  it('splitConcessionaryBoleto should return 4 fields', () => {
    expect(
      BoletoHelpers.generateBankBarcodeVerificationDigit(
        '2129' + '758700000020000001121100012100447561740',
      ),
    ).toBe(9);
  });

  it('parseValue should return trimmed value with 2 decimals', () => {
    expect(BoletoHelpers.parseValue('0000002000')).toBe('20.00');
  });

  it('parseExpirationDate should return ISO date value', () => {
    expect(BoletoHelpers.parseExpirationDate(1000)).toBe('2000-07-03');
    expect(BoletoHelpers.parseExpirationDate(4789)).toBe('2010-11-17');
    expect(BoletoHelpers.parseExpirationDate(9999)).toBe('2025-02-21');
  });

  it('verifyConcessionaryExpirationDate should return ISO date value', () => {
    expect(BoletoHelpers.verifyConcessionaryExpirationDate('20000703')).toBe(
      '2000-07-03',
    );
    expect(BoletoHelpers.verifyConcessionaryExpirationDate('20002201')).toBe(
      'Barcode has no expiration date',
    );
    expect(BoletoHelpers.verifyConcessionaryExpirationDate('20000231')).toBe(
      'Barcode has no expiration date',
    );
  });
});
