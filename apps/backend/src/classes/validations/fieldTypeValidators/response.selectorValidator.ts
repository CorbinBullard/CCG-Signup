import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';

export class SelectValidator extends ResponseValidator {
  constructor(response: CreateResponseDto, field: Field) {
    super(response, field);
  }
  override validate(): string[] {
    super.validate();
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
