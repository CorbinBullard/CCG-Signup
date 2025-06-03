import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateResponseDto } from 'src/response/dto/create-response.dto';
import { CreateSignupConsentFormDto } from 'src/signup-consent-forms/dto/create-signup-consent-form.dto';
import { SignupConsentForm } from 'src/signup-consent-forms/entities/signup-consent-form.entity';

export class CreateSignupDto {
  @IsOptional()
  @IsString()
  note?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateResponseDto)
  responses: CreateResponseDto[];
}
