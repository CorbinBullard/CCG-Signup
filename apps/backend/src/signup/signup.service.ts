/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Signup } from './signup.entity';
import { Repository } from 'typeorm';
import { EventService } from 'src/event/event.service';
import { SignupValidation } from 'src/classes/validations/SignupValidation';
import { FieldsService } from 'src/fields/fields.service';
import { Response } from 'src/response/entities/response.entity';
import { SignupType } from 'src/Types/signup/SignupType';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(Signup) private signupRepository: Repository<Signup>,
    private eventService: EventService,
    private fieldsService: FieldsService,
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
  ) {}

  async create(createSignupDto: CreateSignupDto, eventId: number) {
    const event = await this.eventService.findOne(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    const signup = new SignupValidation(createSignupDto, event);
    signup.validate();
    const newSignup: Signup = this.signupRepository.create({
      ...createSignupDto,
      event,
    });
    const responses: Response[] = await Promise.all(
      newSignup.responses.map(async (response) => {
        const field = await this.fieldsService.findOne(response.fieldId);
        if (!field) {
          throw new BadRequestException('field does not exist');
        }
        return this.responseRepository.create({
          ...response,
          field,
        });
      }),
    );
    newSignup.responses = responses;

    return this.signupRepository.save(newSignup);
  }

  async findAll() {
    return await this.signupRepository.find();
  }

  async findEventSignups(eventId: number): Promise<Signup[] | null> {
    const event = await this.eventService.findOne(eventId);
    if (!event)
      throw new NotFoundException(`Event with id ${eventId} not found`);

    const signups = await this.signupRepository.find({
      where: { event: { id: event.id } },
    });
    return signups;
  }

  async findOne(id: number) {
    const signup = await this.signupRepository.findOne({
      where: { id },
      relations: { responses: { field: true }, event: true },
    });
    if (!signup) throw new NotFoundException(`Signup with id ${id} not found`);
    return signup;
  }

  async update(id: number, updateSignupDto: UpdateSignupDto) {
    const signup = await this.findOne(id);
    if (!signup)
      throw new BadRequestException(`Signup with id ${id} not found`);

    await this.validateSignup(updateSignupDto, signup.event.id);

    const newSignup = Object.assign(signup, updateSignupDto);
    return this.signupRepository.save(newSignup);
  }

  async remove(id: number) {
    const signup = await this.findOne(id);
    if (!signup) throw new NotFoundException(`Signup with id ${id} not found`);
    await this.signupRepository.remove(signup);
    return `Signup with ID ${id} successfuly removed`;
  }

  async validateSignup(signup: SignupType, eventId: number) {
    const event = await this.eventService.findOne(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    const signupValidation: SignupValidation = new SignupValidation(
      signup,
      event,
    );
    signupValidation.validate();
  }
}
