import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';
import { IsAdminGuard } from 'src/guards/jwt-auth.guard';
@UseGuards(IsAdminGuard)
@Controller('events')
export class EventSignupController {
  constructor(private readonly signupService: SignupService) {}

  @Get(':eventId/signups')
  getSignups(@Param('eventId') eventId: number) {
    return this.signupService.findEventSignups(eventId);
  }

  @Post(':eventId/signups')
  create(
    @Body() createSignupDto: CreateSignupDto,
    @Param('eventId') eventId: number,
  ) {
    console.log('SIGN UP : ', createSignupDto);
    return this.signupService.create(createSignupDto, eventId);
  }
}
