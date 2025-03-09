import { Field } from 'src/fields/entities/field.entity';
import { FieldType } from 'src/fields/fieldTypes';
import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from '../fieldTypeValidators/response.validator';
import { NumberValidator } from '../fieldTypeValidators/response.numberValidator';
import { StringValidator } from '../fieldTypeValidators/response.stringValidator';
import { BooleanValidator } from '../fieldTypeValidators/response.booleanValidator';
import { selectValidator } from '../fieldTypeValidators/response.selectorValidator';
import { BadRequestException } from '@nestjs/common';

export class ResponseValidation {
  validator: ResponseValidator;
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
        this.validator = new selectValidator(response, field);
        break;
      }
      default: {
        throw new BadRequestException('Unsupported Field Type');
      }
    }
    this.validator.validate();
  }
}
/* 
  Create classes for each type of field that inherits from ResponseValidation
*/
