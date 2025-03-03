/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { FieldType } from '../fieldTypes';
import { Type } from 'class-transformer';
import { Options } from '../Options';

export class CreateFieldDto {
  @IsString()
  label: string;

  @IsEnum(FieldType)
  type: FieldType;

  @IsBoolean()
  required: boolean;

  // Make options a class to include validation
  @ValidateIf((field) => field.type === FieldType.select)
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => Options)
  options?: Options[];
}
