import { UpdateResponseDto } from 'src/response/dto/update-response.dto';
import { CreateSignupDto } from './create-signup.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSignupDto extends CreateSignupDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateResponseDto)
  responses: UpdateResponseDto[];
}
