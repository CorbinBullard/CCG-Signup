import { Field } from 'src/fields/entities/field.entity';
import { CreateResponseDto } from 'src/response/dto/create-response.dto';

export class ResponseValidator {
  constructor(createResponseDto: CreateResponseDto, field: Field) {}
  validate() {}
}
