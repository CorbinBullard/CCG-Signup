import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';

export class DateValidator extends ResponseValidator {
  constructor(response: CreateResponseDto, field: Field) {
    super(response, field);
  }
  override validate() {
    super.validate();
    this.isDate();
    return this.errors;
  }
  isDate() {
    const date = new Date(this.response.value);
    if (isNaN(date.getTime()))
      this.errors.push(`Field with id ${this.field.id} must be a valid Date`);
  }
}
