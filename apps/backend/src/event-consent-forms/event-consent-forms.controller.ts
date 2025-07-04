/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventConsentFormsService } from './event-consent-forms.service';
import { UpdateEventConsentFormDto } from './dto/update-event-consent-form.dto';

@Controller('event-consent-forms')
export class EventConsentFormsController {
  constructor(
    private readonly eventConsentFormsService: EventConsentFormsService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventConsentFormsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventConsentFormDto: UpdateEventConsentFormDto,
  ) {
    return this.eventConsentFormsService.update(+id, updateEventConsentFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventConsentFormsService.remove(+id);
  }
}
