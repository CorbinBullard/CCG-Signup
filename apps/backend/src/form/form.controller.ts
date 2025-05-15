import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { IsAdminGuard } from 'src/guards/jwt-auth.guard';

@Controller('forms')
export class FormController {
  constructor(private formService: FormService) {}

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
