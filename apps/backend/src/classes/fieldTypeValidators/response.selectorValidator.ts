import { ResponseValidator } from './response.validator';

export class selectValidator extends ResponseValidator {
  override validate(): void {
    console.log('select validator');
  }
}
