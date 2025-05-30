import { IsString } from 'class-validator';

export class CreateConsentFormDto {
  @IsString()
  name: string;

  @IsString()
  body: string;
}
