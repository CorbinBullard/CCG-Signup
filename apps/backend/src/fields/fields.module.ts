import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { IsValidResponse } from 'src/response/validation/isValidResponse';

@Module({
  imports: [TypeOrmModule.forFeature([Field])],
  providers: [FieldsService, IsValidResponse],
  exports: [FieldsService, IsValidResponse],
})
export class FieldsModule {}
