import { CreateResponseDto } from './create-response.dto';
import { IsNumber } from 'class-validator';

export class UpdateResponseDto extends CreateResponseDto {
  @IsNumber()
  id: number;
}
