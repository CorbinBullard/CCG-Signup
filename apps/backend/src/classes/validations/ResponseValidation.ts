import { Field } from 'src/fields/entities/field.entity';
import { FieldTypeEnum } from 'src/fields/fieldTypeEnums';
import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './fieldTypeValidators/response.validator';
import { NumberValidator } from './fieldTypeValidators/response.numberValidator';
import { StringValidator } from './fieldTypeValidators/response.stringValidator';
import { BooleanValidator } from './fieldTypeValidators/response.booleanValidator';
import { SelectValidator } from './fieldTypeValidators/response.selectorValidator';
import { BadRequestException } from '@nestjs/common';
import { DateValidator } from './fieldTypeValidators/response.dateValidator';
import { EmailValidator } from './fieldTypeValidators/response.emailValidator';
import { CompositeValidator } from './fieldTypeValidators/response.compositeValidator';
import { FieldType } from 'src/Types/fields/FieldType';
import { ResponseType } from 'src/Types/response/ResponseType';
import { MultiResponseValidator } from './fieldTypeValidators/response.multiCompositeValidator';

export class ResponseValidation {
  validator: ResponseValidator;
  errors: string[];
  constructor(response: ResponseType, field: FieldType) {
    switch (field.type) {
      case FieldTypeEnum.number: {
        this.validator = new NumberValidator(response, field);
        break;
      }
      case FieldTypeEnum.string: {
        this.validator = new StringValidator(response, field);
        break;
      }
      case FieldTypeEnum.boolean: {
        this.validator = new BooleanValidator(response, field);
        break;
      }
      case FieldTypeEnum.select: {
        this.validator = new SelectValidator(response, field);
        break;
      }
      case FieldTypeEnum.date: {
        this.validator = new DateValidator(response, field);
        break;
      }
      case FieldTypeEnum.email: {
        this.validator = new EmailValidator(response, field);
        break;
      }
      case FieldTypeEnum.composite: {
        this.validator = new CompositeValidator(response, field);
        break;
      }
      case FieldTypeEnum.multiResponse: {
        this.validator = new MultiResponseValidator(response, field);
        break;
      }
      default: {
        throw new BadRequestException('Unsupported Field Type');
      }
    }

    // (return array of errors)
    this.errors = this.validator.validate();
  }
  getErrors(): string[] {
    return this.errors;
  }
}
/* 
  Create classes for each type of field that inherits from ResponseValidation
*/
