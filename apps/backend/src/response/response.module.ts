import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './response.entity';
import { ResponseService } from './response.service';
import { IsValidResponse } from './validation/isValidResponse';
import { Field } from 'src/fields/entities/field.entity';
import { FieldsService } from 'src/fields/fields.service';
import { FieldsModule } from 'src/fields/fields.module';

@Module({
  imports: [TypeOrmModule.forFeature([Response, Field]), FieldsModule],
  providers: [ResponseService, FieldsService, IsValidResponse],
  exports: [ResponseService, IsValidResponse],
})
export class ResponseModule {}
