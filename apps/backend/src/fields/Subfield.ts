/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { SubFieldTypeEnum } from './fieldTypeEnums';
import { Options } from './Options';
import { Type } from 'class-transformer';

export class Subfield {
  @IsString()
  label: string;

  @IsEnum(SubFieldTypeEnum)
  type: SubFieldTypeEnum;

  @IsBoolean()
  required: boolean;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @ValidateIf((subField) => subField.type === SubFieldTypeEnum.select)
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => Options)
  options?: Options[];
}
