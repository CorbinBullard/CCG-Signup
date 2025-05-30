import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Event } from 'src/event/event.entity';
import { Field } from 'src/fields/entities/field.entity';
import { ResponseValidation } from './ResponseValidation';
import { SignupType } from 'src/Types/signup/SignupType';
import { ResponseType } from 'src/Types/response/ResponseType';

export class SignupValidation {
  responses: ResponseType[];
  fields: Field[];
  fieldErrors: string[];

  constructor(signup: SignupType, event: Event) {
    this.responses = signup.responses;
    this.fields = event.form.fields;
    this.fieldErrors = [];
  }
  validate() {
    if (this.fields.length !== this.responses.length)
      throw new BadRequestException(
        'Response length does not match Field Length',
      );
    for (const response of this.responses) {
      const field = this.fields.find((field) => field.id === response.fieldId);
      if (!field) throw new NotFoundException('field not found');
      const responseValidation: ResponseValidation = new ResponseValidation(
        response,
        field,
      );
      this.fieldErrors.push(...responseValidation.getErrors());
    }
    if (this.fieldErrors.length) {
      throw new BadRequestException(this.fieldErrors);
    }
  }
}
