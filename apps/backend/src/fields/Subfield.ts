/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { SubFieldType } from './fieldTypes';
import { Options } from './Options';
import { Type } from 'class-transformer';

export class Subfield {
  @IsString()
  label: string;

  @IsEnum(SubFieldType)
  type: SubFieldType;

  @ValidateIf((subField) => subField.type === SubFieldType.select)
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => Options)
  options?: Options[];
}
