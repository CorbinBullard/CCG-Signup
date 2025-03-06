import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';

@Controller('forms')
export class FormController {
  constructor(private formService: FormService) {}

  @Get(':id')
  getFormById(@Param('id') id: number) {
    return this.formService.findOne(id);
  }

  @Put(':id')
  updateForm(
    @Param('id') id: number,
    @Body() createFormDto: Partial<CreateFormDto>,
  ) {
    return this.formService.updateForm(id, createFormDto);
  }
}
