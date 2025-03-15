import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  create(@Body() createFieldDto: CreateFieldDto) {
    // return this.fieldsService.create(createFieldDto);
  }

  @Get()
  findAll() {
    // return this.fieldsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    // return this.fieldsService.update(+id, updateFieldDto);
  }
}
