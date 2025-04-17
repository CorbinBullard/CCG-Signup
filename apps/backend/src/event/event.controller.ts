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

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  getEvents() {
    return this.eventService.getEvents();
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
    const parsedForm: CreateFormDto = JSON.parse(createEventDto.form);

    const dto: CreateEventDto = {
      ...createEventDto,
      cost: +createEventDto.cost,
      form: parsedForm,
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

  @Delete()
  deleteAllEvents() {
    return this.eventService.deleteAllEvents();
  }

  @Get(':id/signups')
  getEventSignups(@Param('id') id: number, @Query() query: GetSignupsQueryDto) {
    return query;
  }
}
