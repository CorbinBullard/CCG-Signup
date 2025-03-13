import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidator } from './response.validator';
import { Field } from 'src/fields/entities/field.entity';
import { BadRequestException } from '@nestjs/common';

export class CompositeValidator extends ResponseValidator {
  constructor(response: CreateResponseDto, field: Field) {
    super(response, field);
  }
  override validate(): string[] {
    super.validate();
    this.isArray();
    this.validateSubfields();
    return this.errors;
  }
  isArray() {
    if (!Array.isArray(this.response.value))
      this.errors.push(
        `Field with id ${this.field.id} response must be an array`,
      );
  }

  validateSubfields() {
    if (!this.field.subfields)
      throw new BadRequestException('Componsite Field has no subfields');
    for (const subfield of this.field?.subfields) {
      console.log('SubField', subfield);
      // const subfieldErrors: ResponseValidation = new ResponseValidation();
    }
  }
}
