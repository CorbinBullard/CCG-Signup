import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';
import { FieldType } from 'src/Types/FieldType';
import { ResponseType } from 'src/Types/ResponseType';

export class BooleanValidator extends ResponseValidator {
  constructor(response: ResponseType, field: FieldType) {
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
