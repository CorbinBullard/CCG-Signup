import { Module } from '@nestjs/common';
import { FormTemplateService } from './form-template.service';
import { FormTemplateController } from './form-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormTemplate } from './entities/form-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormTemplate])],
  controllers: [FormTemplateController],
  providers: [FormTemplateService],
  exports: [FormTemplateService],
})
export class FormTemplateModule {}
