import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { IsAdminGuard } from 'src/guards/jwt-auth.guard';
import { FormQueryParamsDto } from './dto/form-queryParams.dto';
@UseGuards(IsAdminGuard)
@Controller('forms')
export class FormController {
  constructor(private formService: FormService) {}

  @Get()
  getForms() {
    return this.formService.find();
  }

  @Post()
  createForm(@Body() createFormDto: CreateFormDto) {
    console.log(createFormDto);
    return this.formService.createForm(createFormDto);
  }

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
