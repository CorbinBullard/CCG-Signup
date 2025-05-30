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

export class UpdateFieldDto extends CreateFieldDto {
  @IsOptional()
  @IsNumber()
  id?: number;
}
