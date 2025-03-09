import { ResponseValidator } from './response.validator';

export class StringValidator extends ResponseValidator {
  override validate() {
    console.log('string validation');
  }
}
