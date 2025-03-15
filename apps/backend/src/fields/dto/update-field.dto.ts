/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldDto } from './create-field.dto';
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
import { FieldTypeEnum } from '../fieldTypeEnums';
import { Type } from 'class-transformer';
import { Options } from '../Options';
import { Subfield } from '../Subfield';

export class UpdateFieldDto extends PartialType(CreateFieldDto) {
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
  @ArrayMinSize(2)
  @Type(() => Subfield)
  subfields: Subfield[];
}
