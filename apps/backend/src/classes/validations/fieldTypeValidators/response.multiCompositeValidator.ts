/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FieldType } from 'src/Types/fields/FieldType';
import { CompositeValidator } from './response.compositeValidator';
import { ResponseValidator } from './response.validator';
import { MultiResponseType } from 'src/Types/response/MultiResponseType';

export class MultiResponseValidator extends ResponseValidator {
  response: MultiResponseType;
  constructor(response: MultiResponseType, field: FieldType) {
    super(response, field);
  }
  override validate(): string[] {
    super.validate();
    if (super.shouldSkipValidation()) return [];
    this.isNestedArray();
    this.validateSubResponses();
    return this.errors;
  }
  isNestedArray() {
    if (!Array.isArray(this.response.value))
      this.errors.push(
        `Field with id ${this.field.id} response must be an array`,
      );
    if (
      !this.response.value.every((response) => Array.isArray(response.value))
    ) {
      this.errors.push(
        `Field with id ${this.field.id} responses must each be an array`,
      );
    }
  }
  validateSubResponses() {
    for (const response of this.response.value) {
      const compositeValidator: CompositeValidator = new CompositeValidator(
        response,
        this.field,
      );
      compositeValidator.validateSubResponse();
      this.errors.push(...compositeValidator.errors);
    }
  }
}
