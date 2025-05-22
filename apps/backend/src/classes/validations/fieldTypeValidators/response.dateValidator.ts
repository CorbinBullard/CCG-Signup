import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';
import { FieldType } from 'src/Types/fields/FieldType';
import { ResponseType } from 'src/Types/response/ResponseType';

export class DateValidator extends ResponseValidator {
  constructor(response: ResponseType, field: FieldType) {
    super(response, field);
  }
  override validate() {
    super.validate();
    if (super.shouldSkipValidation()) return [];
    this.isDate();
    return this.errors;
  }
  isDate() {
    const date: Date = new Date(this.response.value);
    if (isNaN(date.getTime())) {
      this.errors.push(`Field with id ${this.field.id} must be a valid Date`);
    }
  }
}
