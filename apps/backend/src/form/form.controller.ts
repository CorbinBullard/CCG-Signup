import { Body, Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { IsAdminGuard } from 'src/guards/jwt-auth.guard';
import { FormQueryParamsDto } from './dto/form-queryParams.dto';

@Controller('forms')
export class FormController {
  constructor(private formService: FormService) {}

  @Get()
  getEvents(@Query() query: FormQueryParamsDto) {
    return this.formService.find(query);
  }

  @Get(':id')
  getFormById(@Param('id') id: number) {
    return this.formService.findOne(id);
  }

  @Put(':id')
  @UseGuards(IsAdminGuard)
  updateForm(
    @Param('id') id: number,
    @Body() createFormDto: Partial<CreateFormDto>,
  ) {
    return this.formService.updateForm(id, createFormDto);
  }
}
