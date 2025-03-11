import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';

export class EmailValidator extends ResponseValidator {
  constructor(response: CreateResponseDto, field: Field) {
    super(response, field);
  }
  override validate(): string[] {
    return this.errors;
  }
  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email))
      this.errors.push(`Field with id ${this.field.id} must be a valid email`);
  }
}
