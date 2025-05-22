/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsDateString,
  IsEnum,
  IsMilitaryTime,
  IsNumber,
  IsString,
} from 'class-validator';
import { FundLocationEnum } from '../FundLocationEnum';

export class UpdateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsMilitaryTime()
  time: string;

  @IsString()
  image: string;

  @IsNumber()
  cost: number;

  @IsEnum(FundLocationEnum)
  funds: FundLocationEnum;

  @IsNumber()
  signupLimit: number;
}
