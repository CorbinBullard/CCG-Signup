import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateResponseDto {
  @IsNumber()
  @IsNotEmpty()
  fieldId: number;

  @IsOptional()
  value: any;
}
