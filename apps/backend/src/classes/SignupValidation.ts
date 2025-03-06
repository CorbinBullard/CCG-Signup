/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Res } from '@nestjs/common';
import { Field } from 'src/field/field.entity';
import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { ResponseValidation } from './ResponseValidation';

export class SignupValidation {
  private fields: Field[];
  private responses: CreateResponseDto[];
  private responsesObj: object;
  constructor(fields: Field[], responses: any[]) {
    this.fields = fields;
    this.responses = responses;
    this.responsesObj = this.responses.reduce((acc, response) => {
      acc[response.fieldId] = response.value;
      return acc;
    }, {});
  }
  validate() {
    for (const field of this.fields) {
      const response = this.responsesObj[field.id];
      if (field.required && !response) {
        throw new BadRequestException(
          `Field ${field.label} is required but was not provided`,
        );
      } else {
        if (!ResponseValidation.validateType(field.type, response)) {
          throw new BadRequestException(
            `Field ${field.label} is of the wrong type`,
          );
        }
      }
    }
  }
}
