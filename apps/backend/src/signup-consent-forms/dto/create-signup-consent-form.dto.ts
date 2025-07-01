import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSignupConsentFormDto {
  @IsInt()
  eventConsentFormId: number;

  @IsBoolean()
  agreed: boolean;

  @IsOptional()
  @IsDate()
  agreedAt?: Date;

  @IsOptional()
  @IsString()
  deviceName?: string;
}
