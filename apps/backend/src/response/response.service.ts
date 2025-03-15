import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from './entities/response.entity';
import { Repository } from 'typeorm';
import { CreateResponseDto } from './dto/create-response.dto';
import { Field } from 'src/fields/entities/field.entity';
import { FieldsService } from 'src/fields/fields.service';
import { response } from 'express';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
    private fieldsService: FieldsService,
  ) {}

  async create(createResponseDto: CreateResponseDto) {
    console.log(createResponseDto);
    const field = await this.fieldsService.findOne(createResponseDto.fieldId);
  }
}
