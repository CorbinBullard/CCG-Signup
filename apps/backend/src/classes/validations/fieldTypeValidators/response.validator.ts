import { Field } from 'src/fields/entities/field.entity';
import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { FieldType } from 'src/Types/FieldType';
import { ResponseType } from 'src/Types/ResponseType';

export abstract class ResponseValidator {
  response: ResponseType;
  field: FieldType;
  errors: string[];
  constructor(response: ResponseType, field: FieldType) {
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
