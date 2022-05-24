import { BadRequestException, Injectable } from '@nestjs/common';
import { BoletoHelpers } from '../helpers/helpers';
import { ValidationReturn } from '../interfaces/validationReturn';

@Injectable()
export class BoletoService {
  execute(code: string): ValidationReturn {
    if (code.length === 47) {
      return this.boletoBancario(code);
    } else {
      return this.concessionaria(code);
    }
  }

  boletoBancario(code: string): ValidationReturn {
    const [firstField, secondField, thirdField, fourthField, fifthField] =
      BoletoHelpers.splitBankBoleto(code);

    const [financialInstitution] = firstField.match(/^(\d{3})/);
    const [currency] = firstField.match(/(?<=^\d{3})\d/);
    const [charIndex20To24] = firstField.match(/(?<=^\d{4})\d{5}/);
    const [firstVerifyDigit] = firstField.match(/(?<=^\d{9})\d/);

    BoletoHelpers.verifyFieldWithDigit({
      code: financialInstitution + currency + charIndex20To24,
      digit: parseInt(firstVerifyDigit, 10),
      field: 'first',
    });

    const [charIndex25To34] = secondField.match(/^\d{10}/);
    const [secondVerifyDigit] = secondField.match(/(?<=^\d{10})\d/);

    BoletoHelpers.verifyFieldWithDigit({
      code: charIndex25To34,
      digit: parseInt(secondVerifyDigit, 10),
      field: 'second',
    });

    const [charIndex35To44] = thirdField.match(/^\d{10}/);
    const [thirdVerifyDigit] = thirdField.match(/(?<=^\d{10})\d/);

    BoletoHelpers.verifyFieldWithDigit({
      code: charIndex35To44,
      digit: parseInt(thirdVerifyDigit, 10),
      field: 'third',
    });

    const [expirationCode] = fifthField.match(/^\d{4}/);
    const [value] = fifthField.match(/(?<=^\d{4})\d+/);

    const leftCode = financialInstitution + currency;
    const rightCode =
      fifthField + charIndex20To24 + charIndex25To34 + charIndex35To44;

    const verificationCode = BoletoHelpers.generateBankBarcodeVerificationDigit(
      leftCode + rightCode,
    );

    if (verificationCode !== parseInt(fourthField, 10))
      throw new BadRequestException({
        data: {
          message: 'Failed to verify barCode automate verification digit',
        },
      });

    return {
      barCode: leftCode + verificationCode + rightCode,
      amount: BoletoHelpers.parseValue(value),
      expirationDate: BoletoHelpers.parseExpirationDate(
        parseInt(expirationCode, 10),
      ),
    };
  }

  concessionaria(code: string): ValidationReturn {
    const [firstField, secondField, thirdField, fourthField] =
      BoletoHelpers.splitConcessionaryBoleto(code);

    const [charIndex1To11] = firstField.match(/^\d{11}/);
    const [firstVerifyDigit] = firstField.match(/(?<=^\d{11})\d/);
    BoletoHelpers.verifyFieldWithDigit({
      code: charIndex1To11,
      digit: parseInt(firstVerifyDigit, 10),
      field: 'first',
    });

    const [charIndex12To22] = secondField.match(/^\d{11}/);
    const [secondVerifyDigit] = secondField.match(/(?<=^\d{11})\d/);
    BoletoHelpers.verifyFieldWithDigit({
      code: charIndex12To22,
      digit: parseInt(secondVerifyDigit, 10),
      field: 'second',
    });

    const [charIndex23To33] = thirdField.match(/^\d{11}/);
    const [thirdVerifyDigit] = thirdField.match(/(?<=^\d{11})\d/);
    BoletoHelpers.verifyFieldWithDigit({
      code: charIndex23To33,
      digit: parseInt(thirdVerifyDigit, 10),
      field: 'third',
    });

    const [charIndex34To44] = fourthField.match(/^\d{11}/);
    const [fourthVerifyDigit] = fourthField.match(/(?<=^\d{11})\d/);
    BoletoHelpers.verifyFieldWithDigit({
      code: charIndex34To44,
      digit: parseInt(fourthVerifyDigit, 10),
      field: 'fourth',
    });

    const barCode =
      charIndex1To11 + charIndex12To22 + charIndex23To33 + charIndex34To44;

    const [lefCode] = barCode.match(/^\d{3}/);
    const [verificationCode] = barCode.match(/(?<=^\d{3})\d/);
    const [rightCode] = barCode.match(/(?<=^\d{4})\d+/);

    const generatedVerifyDigit = BoletoHelpers.generateVerifyNumber(
      lefCode + rightCode,
    );

    if (generatedVerifyDigit !== parseInt(verificationCode, 10))
      throw new BadRequestException({
        data: {
          message: 'Failed to verify barCode automate verification digit',
        },
      });

    const [value] = barCode.match(/(?<=^\d{4})\d{11}/);

    const [segment] = barCode.match(/(?<=^\d)\d/);

    const [expirationDate] =
      segment === '6'
        ? barCode.match(/(?<=^\d{13})\d{8}/)
        : barCode.match(/(?<=^\d{19})\d{8}/);

    return {
      barCode,
      amount: BoletoHelpers.parseValue(value),
      expirationDate:
        BoletoHelpers.verifyConcessionaryExpirationDate(expirationDate),
    };
  }
}
