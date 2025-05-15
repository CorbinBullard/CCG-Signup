import { IsOptional, IsString } from 'class-validator';

export class FormQueryParamsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  isSaved?: boolean;
}
