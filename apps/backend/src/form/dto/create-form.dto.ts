/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateFieldDto } from 'src/field/dto/create-field.dto';

export class CreateFormDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Form must have at least one field' })
  @ValidateNested()
  @Type(() => CreateFieldDto)
  fields: CreateFieldDto[];
}
