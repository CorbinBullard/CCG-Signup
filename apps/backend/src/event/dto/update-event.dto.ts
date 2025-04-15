/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsDateString,
  IsMilitaryTime,
  IsNumber,
  IsString,
} from 'class-validator';

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
}
