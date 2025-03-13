import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './response.entity';
import { ResponseService } from './response.service';
import { Field } from 'src/fields/entities/field.entity';
import { FieldsService } from 'src/fields/fields.service';
import { FieldsModule } from 'src/fields/fields.module';

@Module({
  imports: [TypeOrmModule.forFeature([Response, Field]), FieldsModule],
  providers: [ResponseService, FieldsService],
  exports: [ResponseService],
})
export class ResponseModule {}
