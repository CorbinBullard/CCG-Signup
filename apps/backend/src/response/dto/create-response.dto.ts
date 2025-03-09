import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { IsValidResponse } from '../validation/isValidResponse';

export class CreateResponseDto {
  @IsNumber()
  @IsNotEmpty()
  fieldId: number;

  @IsNotEmpty()
  @Validate(IsValidResponse, {
    message: 'Invalid Response',
  })
  value: any;
}
