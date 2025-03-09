import { ResponseValidator } from './response.validator';

export class BooleanValidator extends ResponseValidator {
  override validate() {
    console.log('Boolean Validation');
  }
}
