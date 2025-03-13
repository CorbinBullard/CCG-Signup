import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';
import { FieldType } from 'src/Types/FieldType';
import { ResponseType } from 'src/Types/ResponseType';

export class StringValidator extends ResponseValidator {
  constructor(response: ResponseType, field: FieldType) {
    super(response, field);
  }
  override validate() {
    super.validate();

    return this.errors;
  }
}
