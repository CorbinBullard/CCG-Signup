import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';
import { FieldType } from 'src/Types/fields/FieldType';
import { ResponseType } from 'src/Types/response/ResponseType';

export class EmailValidator extends ResponseValidator {
  constructor(response: ResponseType, field: FieldType) {
    super(response, field);
  }
  override validate(): string[] {
    this.isValidEmail();
    if (super.shouldSkipValidation()) return [];
    return this.errors;
  }
  isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.response.value))
      this.errors.push(`Field with id ${this.field.id} must be a valid email`);
  }
}
