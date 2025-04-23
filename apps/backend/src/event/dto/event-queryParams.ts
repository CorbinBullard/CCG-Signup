import { IsOptional, IsString } from 'class-validator';

export class EventQueryParamsDto {
  @IsOptional()
  @IsString()
  title?: string;
}
