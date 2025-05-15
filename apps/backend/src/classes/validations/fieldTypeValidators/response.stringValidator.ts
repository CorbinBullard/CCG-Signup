import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';
import { FieldType } from 'src/Types/fields/FieldType';
import { ResponseType } from 'src/Types/response/ResponseType';

export class StringValidator extends ResponseValidator {
  constructor(response: ResponseType, field: FieldType) {
    super(response, field);
  }
  override validate() {
    super.validate();
    if (super.shouldSkipValidation()) return [];
    this.isString();
    return this.errors;
  }

  isString() {
    if (typeof this.response.value !== 'string')
      this.errors.push(
        `Field with id ${this.field.id} response must be a string`,
      );
  }
}
