import { ResponseValidator } from './response.validator';

export class NumberValidator extends ResponseValidator {
  override validate() {
    console.log('number validation');
  }
}
