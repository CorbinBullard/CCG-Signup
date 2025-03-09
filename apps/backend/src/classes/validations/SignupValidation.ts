import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Event } from 'src/event/event.entity';
import { Field } from 'src/fields/entities/field.entity';
import { Form } from 'src/form/form.entity';
import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { CreateSignupDto } from 'src/signup/dto/create-signup.dto';
import { ResponseValidation } from './ResponseValidation';

export class SignupValidation {
  responses: CreateResponseDto[];
  fields: Field[];
  constructor(createSignupDto: CreateSignupDto, event: Event) {
    this.responses = createSignupDto.responses;
    this.fields = event.form.fields;
  }
  validate() {
    if (this.fields.length !== this.responses.length)
      throw new BadRequestException(
        'Response length does not match Field Length',
      );
    for (const response of this.responses) {
      const field = this.fields.find((field) => field.id === response.fieldId);
      if (!field) throw new NotFoundException('field not found');
      const responseValidation = new ResponseValidation(response, field);
    }
  }
}
