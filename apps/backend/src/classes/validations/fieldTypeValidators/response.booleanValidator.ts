import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';

export class BooleanValidator extends ResponseValidator {
  constructor(response: CreateResponseDto, field: Field) {
    super(response, field);
  }
  override validate() {
    super.validate();
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
