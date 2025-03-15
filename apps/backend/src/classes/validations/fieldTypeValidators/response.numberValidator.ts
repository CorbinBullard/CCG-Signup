import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';
import { FieldType } from 'src/Types/fields/FieldType';
import { ResponseType } from 'src/Types/response/ResponseType';

export class NumberValidator extends ResponseValidator {
  constructor(response: ResponseType, field: FieldType) {
    super(response, field);
  }
  override validate(): string[] {
    super.validate();
    this.isNumber();
    this.isPositive();
    this.isInteger();
    return this.errors;
  }
  isNumber() {
    if (typeof this.response.value !== 'number')
      this.errors.push(
        `Field with id ${this.field.id} requires a number for a response value`,
      );
  }
  isPositive() {
    if (this.response.value < 0)
      this.errors.push(`Field with id ${this.field.id} must be positive`);
  }
  isInteger() {
    if (!Number.isInteger(this.response.value))
      this.errors.push(`Field with id ${this.field.id} must be an integer`);
  }
}
