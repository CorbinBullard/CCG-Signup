/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsMilitaryTime,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateFormDto } from 'src/form/dto/create-form.dto';
import { FundLocationEnum } from '../FundLocationEnum';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsMilitaryTime()
  time: string;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsEnum(FundLocationEnum)
  funds: FundLocationEnum;

  @IsOptional()
  @IsNumber()
  signupLimit?: number;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateFormDto)
  form: CreateFormDto;
}
