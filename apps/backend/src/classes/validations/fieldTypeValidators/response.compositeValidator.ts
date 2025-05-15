/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { BadRequestException } from '@nestjs/common';
import { FieldType } from 'src/Types/fields/FieldType';
import { ResponseValidation } from '../ResponseValidation';
import { ResponseType } from 'src/Types/response/ResponseType';

export class CompositeValidator extends ResponseValidator {
  constructor(response: ResponseType, field: FieldType) {
    super(response, field);
  }
  override validate(): string[] {
    super.validate();
    if (super.shouldSkipValidation()) return [];
    this.isArray();
    this.validateSubResponse();
    return this.errors;
  }
  isArray() {
    if (!Array.isArray(this.response.value))
      this.errors.push(
        `Field with id ${this.field.id} response must be an array`,
      );
  }

  validateSubResponse() {
    if (!this.field.subfields)
      throw new BadRequestException('Field has no subfields');
    for (let i = 0; i < this.field.subfields?.length; i++) {
      const response: ResponseType = this.response.value[i];
      const subField: FieldType = this.field.subfields[i];
      subField.id = this.field.id;

      const responseValidation = new ResponseValidation(response, subField);
      this.errors.push(...responseValidation.getErrors());
    }
  }
}
