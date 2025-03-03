/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateFormDto } from 'src/form/dto/create-form.dto';

export class CreateEventDto {
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

  @IsObject()
  @ValidateNested()
  @Type(() => CreateFormDto)
  form: CreateFormDto;
}
