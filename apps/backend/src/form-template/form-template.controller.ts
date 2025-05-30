import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { FormTemplateService } from './form-template.service';
import { CreateFormTemplateDto } from './dto/create-form-template.dto';
import { UpdateFormTemplateDto } from './dto/update-form-template.dto';
import { FormQueryParamsDto } from 'src/form/dto/form-queryParams.dto';

@Controller('form-templates')
export class FormTemplateController {
  constructor(private readonly formTemplateService: FormTemplateService) {}

  @Post()
  create(@Body() createFormTemplateDto: CreateFormTemplateDto) {
    console.log(createFormTemplateDto);
    return this.formTemplateService.create(createFormTemplateDto);
  }

  @Get()
  findAll(@Query() query: FormQueryParamsDto) {
    return this.formTemplateService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formTemplateService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormTemplateDto: UpdateFormTemplateDto,
  ) {
    console.log(updateFormTemplateDto);
    return this.formTemplateService.update(+id, updateFormTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formTemplateService.remove(+id);
  }
}
