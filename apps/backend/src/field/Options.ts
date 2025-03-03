import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Options {
  @IsString()
  label: string;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  cost: number;
}
