import { PartialType } from '@nestjs/mapped-types';
import { CreateFormDto } from './create-form.dto';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateFieldDto } from 'src/fields/dto/update-field.dto';
import { CreateFieldDto } from 'src/fields/dto/create-field.dto';

export class UpdateFormDto extends CreateFormDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsArray()
  @ArrayMinSize(1, { message: 'Form must have at least one field' })
  @ValidateNested({ each: true })
  @Type(() => UpdateFieldDto)
  fields: UpdateFieldDto[] | CreateFieldDto[];
}
