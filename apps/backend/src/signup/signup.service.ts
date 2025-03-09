import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Signup } from './signup.entity';
import { Repository } from 'typeorm';
import { EventService } from 'src/event/event.service';
import { SignupValidation } from 'src/classes/validations/SignupValidation';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(Signup) private signupRepository: Repository<Signup>,
    private eventService: EventService,
  ) {}

  async create(createSignupDto: CreateSignupDto, eventId: number) {
    const event = await this.eventService.findOne(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    const signup = new SignupValidation(createSignupDto, event);
    signup.validate();
  }

  findAll() {
    return this.signupRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} signup`;
  }

  update(id: number, updateSignupDto: UpdateSignupDto) {
    return `This action updates a #${id} signup`;
  }

  remove(id: number) {
    return `This action removes a #${id} signup`;
  }
}
