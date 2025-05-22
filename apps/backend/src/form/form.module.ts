import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormController } from './form.controller';
import { Form } from './form.entity';
import { JwtService } from '@nestjs/jwt';
import { FormTemplateModule } from 'src/form-template/form-template.module';

@Module({
  imports: [TypeOrmModule.forFeature([Form]), FormTemplateModule],
  controllers: [FormController],
  providers: [FormService, JwtService],
})
export class FormModule {}
