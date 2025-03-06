import { Body, Controller, Param, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';

@Controller('events')
export class EventSignupController {
  constructor(private readonly signupService: SignupService) {}
  @Post(':eventId/signups')
  create(
    @Body() createSignupDto: CreateSignupDto,
    @Param('eventId') eventId: number,
  ) {
    return this.signupService.create(createSignupDto, eventId);
  }
}
