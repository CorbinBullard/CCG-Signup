import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateFieldDto } from 'src/fields/dto/create-field.dto';

export class CreateFormTemplateDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Form must have at least one field' })
  @ValidateNested({ each: true })
  @Type(() => CreateFieldDto)
  fields: CreateFieldDto[];
}
