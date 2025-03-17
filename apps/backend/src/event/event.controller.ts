/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetSignupsQueryDto } from './dto/query-params.dto';
import { IsAdminGuard } from 'src/guards/jwt-auth.guard';

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
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Put(':id')
  @UseGuards(IsAdminGuard)
  updateEvent(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(id, updateEventDto);
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
