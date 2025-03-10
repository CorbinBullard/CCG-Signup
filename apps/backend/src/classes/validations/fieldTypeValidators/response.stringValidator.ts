import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';

export class StringValidator extends ResponseValidator {
  constructor(response: CreateResponseDto, field: Field) {
    super(response, field);
  }
  override validate() {
    super.validate();

    return this.errors;
  }
}
