/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetSignupsQueryDto } from './dto/query-params.dto';
import { IsAdminGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFormDto } from 'src/form/dto/create-form.dto';
import { EventQueryParamsDto } from './dto/event-queryParams.dto';
import { CreateEventConsentFormDto } from 'src/event-consent-forms/dto/create-event-consent-form.dto';
import { EventConsentFormsService } from 'src/event-consent-forms/event-consent-forms.service';

@Controller('events')
export class EventController {
  constructor(
    private eventService: EventService,
    private efcService: EventConsentFormsService,
  ) {}

  @Get()
  getEvents(@Query() query: EventQueryParamsDto) {
    return this.eventService.getEvents(query);
  }

  @Get(':id')
  getEventById(@Param('id') id: number) {
    return this.eventService.findOne(id);
  }

  @Post()
  @UseGuards(IsAdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  createEvent(
    @UploadedFile() image: Express.Multer.File,
    @Body() createEventDto: any,
  ) {
    console.log(createEventDto);
    // Parse 'form' only if it's a string
    const parsedForm =
      typeof createEventDto.form === 'string'
        ? JSON.parse(createEventDto.form)
        : createEventDto.form;

    // Parse 'consentForms' only if it's present and a string
    const parsedConsentForms = createEventDto.consentForms
      ? typeof createEventDto.consentForms === 'string'
        ? JSON.parse(createEventDto.consentForms)
        : createEventDto.consentForms
      : [];

    const dto: CreateEventDto = {
      ...createEventDto,
      cost: createEventDto.cost ? +createEventDto.cost : undefined,
      signupLimit: createEventDto.signupLimit
        ? +createEventDto.signupLimit
        : undefined,
      form: parsedForm,
      eventConsentForms: parsedConsentForms,
    };

    if (!image) throw new BadRequestException('Image file is required');
    return this.eventService.createEvent(dto, image);
  }

  @Put(':id')
  @UseGuards(IsAdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  updateEvent(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: number,
    @Body() updateEventDto: any,
  ) {
    return this.eventService.updateEvent(id, updateEventDto, image);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  deleteEvent(@Param('id') id: number) {
    return this.eventService.deleteEvent(id);
  }

  @Get(':id/consent-forms')
  @UseGuards(IsAdminGuard)
  getEventConsentForms(@Param('id') id: number) {
    return this.efcService.find(id);
  }

  @Put(':id/consent-forms')
  @UseGuards(IsAdminGuard)
  updateEventConsentForms(
    @Param('id') id: number,
    @Body() ecfArray: CreateEventConsentFormDto[],
  ) {
    console.log(ecfArray);
    return this.eventService.updateEventConsentForms(id, ecfArray);
  }
}
