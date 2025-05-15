import { ResponseValidator } from './response.validator';
import { FieldType } from 'src/Types/fields/FieldType';
import { ResponseType } from 'src/Types/response/ResponseType';

export class BooleanValidator extends ResponseValidator {
  constructor(response: ResponseType, field: FieldType) {
    super(response, field);
  }
  override validate() {
    super.validate();
    if (super.shouldSkipValidation()) return [];
    this.isBoolean();
    return this.errors;
  }
  isBoolean() {
    if (typeof this.response.value !== 'boolean')
      this.errors.push(
        `Field with id ${this.field.id} must be a boolean value`,
      );
  }
}
