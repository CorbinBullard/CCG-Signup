import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ConsentFormsService } from './consent-forms.service';
import { CreateConsentFormDto } from './dto/create-consent-form.dto';
import { UpdateConsentFormDto } from './dto/update-consent-form.dto';
import { ConsentFormQueryParamsDto } from './dto/consent-form-query-params.dto';

@Controller('consent-forms')
export class ConsentFormsController {
  constructor(private consentFormsService: ConsentFormsService) {}

  @Post()
  create(@Body() createConsentFormDto: CreateConsentFormDto) {
    return this.consentFormsService.create(createConsentFormDto);
  }

  @Get()
  findAll(@Query() query: ConsentFormQueryParamsDto) {
    return this.consentFormsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consentFormsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsentFormDto: UpdateConsentFormDto,
  ) {
    return this.consentFormsService.update(+id, updateConsentFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consentFormsService.remove(+id);
  }
}
