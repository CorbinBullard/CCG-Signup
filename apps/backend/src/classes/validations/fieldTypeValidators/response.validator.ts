import { Field } from 'src/fields/entities/field.entity';
import { CreateResponseDto } from 'src/response/dto/create-response.dto';

export abstract class ResponseValidator {
  response: CreateResponseDto;
  field: Field;
  errors: string[];
  constructor(response: CreateResponseDto, field: Field) {
    this.response = response;
    this.field = field;
    this.errors = [];
  }
  validate(): string[] {
    if (this.response.value === null && this.field.required) {
      this.errors.push(`Field with id ${this.field.id} cannot be null`);
    }
    return this.errors;
  }
}
