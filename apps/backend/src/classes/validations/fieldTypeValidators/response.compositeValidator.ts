/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { BadRequestException } from '@nestjs/common';
import { FieldType } from 'src/Types/FieldType';
import { ResponseValidation } from '../ResponseValidation';
import { ResponseType } from 'src/Types/ResponseType';

export class CompositeValidator extends ResponseValidator {
  constructor(response: ResponseType, field: FieldType) {
    super(response, field);
  }
  override validate(): string[] {
    super.validate();
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
      const field: FieldType = this.field.subfields[i];

      const responseValidation = new ResponseValidation(response, field);
      this.errors.push(...responseValidation.getErrors());
    }
  }
}
