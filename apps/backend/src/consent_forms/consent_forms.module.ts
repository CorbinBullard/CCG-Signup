import { Module } from '@nestjs/common';
import { ConsentFormsService } from './consent_forms.service';
import { ConsentFormsController } from './consent_forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsentForm } from './entities/consent_form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsentForm])],
  controllers: [ConsentFormsController],
  providers: [ConsentFormsService],
  exports: [ConsentFormsService],
})
export class ConsentFormsModule {}
