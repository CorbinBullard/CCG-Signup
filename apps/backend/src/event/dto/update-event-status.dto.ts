import { IsBoolean } from 'class-validator';

export class UpdateEventStatusDto {
  @IsBoolean()
  isActive: boolean;
}
