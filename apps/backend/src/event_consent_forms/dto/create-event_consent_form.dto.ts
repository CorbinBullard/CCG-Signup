import { IsBoolean, IsInt } from 'class-validator';

export class CreateEventConsentFormDto {
  @IsInt()
  consentFormId: number;

  @IsBoolean()
  required: boolean;
}
