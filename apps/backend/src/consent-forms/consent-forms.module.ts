import { Module } from '@nestjs/common';
import { ConsentFormsService } from './consent-forms.service';
import { ConsentFormsController } from './consent-forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsentForm } from './entities/consent-form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsentForm])],
  controllers: [ConsentFormsController],
  providers: [ConsentFormsService],
  exports: [ConsentFormsService],
})
export class ConsentFormsModule {}
