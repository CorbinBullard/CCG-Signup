import { IsOptional, IsString } from 'class-validator';

export class ConsentFormQueryParamsDto {
  @IsOptional()
  @IsString()
  name: string;
}
