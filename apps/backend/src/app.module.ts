import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignupModule } from './signup/signup.module';
import { FieldsModule } from './fields/fields.module';
import { ResponseModule } from './response/response.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DropboxModule } from './dropbox/dropbox.module';
import { FormTemplateModule } from './form-template/form-template.module';
import { AwsS3Service } from './aws-s3/aws-s3.service';
import { ConsentFormsModule } from './consent_forms/consent_forms.module';
import { EventConsentFormsModule } from './event_consent_forms/event_consent_forms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/dev.db', // Path to your SQLite database file
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Auto-load entity files
      synchronize: true, // Auto-sync schema (disable in production)
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    EventModule,
    FormModule,
    SignupModule,
    FieldsModule,
    ResponseModule,
    AuthModule,
    ConfigModule,
    DropboxModule,
    FormTemplateModule,
    ConsentFormsModule,
    EventConsentFormsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AwsS3Service],
})
export class AppModule {}
