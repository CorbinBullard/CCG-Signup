import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';
import { FieldType } from 'src/Types/fields/FieldType';
import { ResponseType } from 'src/Types/response/ResponseType';

export class SelectValidator extends ResponseValidator {
  constructor(response: ResponseType, field: FieldType) {
    super(response, field);
  }
  override validate(): string[] {
    super.validate();
    if (super.shouldSkipValidation()) return [];
    this.isValidOption();
    return this.errors;
  }
  isValidOption() {
    if (
      !this.field.options?.find(
        (option) => option.label === this.response.value,
      )
    )
      this.errors.push(
        `Field with id ${this.field.id} response must be a valid option`,
      );
  }
}
