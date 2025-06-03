/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { FieldTypeEnum } from '../fieldTypeEnums';
import { Type } from 'class-transformer';
import { Options } from '../../fields/Options';
import { Subfield } from '../Subfield';

export class CreateFieldDto {
  @IsString()
  label: string;

  @IsEnum(FieldTypeEnum)
  type: FieldTypeEnum;

  @IsBoolean()
  required: boolean;

  @IsOptional()
  @IsNumber()
  @ValidateIf((field) => field.type === FieldTypeEnum.composite)
  cost?: number;

  @ValidateIf((field) => field.type === FieldTypeEnum.select)
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => Options)
  options?: Options[];

  @ValidateIf(
    (field) =>
      field.type === FieldTypeEnum.composite ||
      field.type === FieldTypeEnum.multiResponse,
  )
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Subfield)
  subfields: Subfield[];
}
