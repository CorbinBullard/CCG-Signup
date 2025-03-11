import { Field } from 'src/fields/entities/field.entity';
import { FieldType } from 'src/fields/fieldTypes';
import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './fieldTypeValidators/response.validator';
import { NumberValidator } from './fieldTypeValidators/response.numberValidator';
import { StringValidator } from './fieldTypeValidators/response.stringValidator';
import { BooleanValidator } from './fieldTypeValidators/response.booleanValidator';
import { SelectValidator } from './fieldTypeValidators/response.selectorValidator';
import { BadRequestException } from '@nestjs/common';
import { DateValidator } from './fieldTypeValidators/response.dateValidator';

export class ResponseValidation {
  validator: ResponseValidator;
  errors: string[];
  constructor(response: CreateResponseDto, field: Field) {
    switch (field.type) {
      case FieldType.number: {
        this.validator = new NumberValidator(response, field);
        break;
      }
      case FieldType.string: {
        this.validator = new StringValidator(response, field);
        break;
      }
      case FieldType.boolean: {
        this.validator = new BooleanValidator(response, field);
        break;
      }
      case FieldType.select: {
        this.validator = new SelectValidator(response, field);
        break;
      }
      case FieldType.date: {
        this.validator = new DateValidator(response, field);
        break;
      }
      case FieldType.email: {
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
