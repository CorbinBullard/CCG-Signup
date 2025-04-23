import { Transform, Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsOptional } from 'class-validator';

export class GetSignupsQueryDto {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }: { value: string }) => value.split(',').map(Number))
  fields?: number[];

  @IsOptional()
  @IsDateString()
  afterDate?: string;

  @IsOptional()
  @IsDateString()
  beforeDate?: string;
  
}
