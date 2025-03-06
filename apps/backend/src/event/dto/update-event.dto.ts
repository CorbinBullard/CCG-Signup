/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsString()
  image: string;

  @IsNumber()
  cost: number;
}
