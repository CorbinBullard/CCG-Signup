import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { EventSignupController } from './event-signup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signup } from './signup.entity';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Signup, Event])],
  controllers: [SignupController, EventSignupController],
  providers: [SignupService, EventService],
})
export class SignupModule {}
