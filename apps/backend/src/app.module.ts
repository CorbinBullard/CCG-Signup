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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DropboxModule } from './dropbox/dropbox.module';
import { FormTemplateModule } from './form-template/form-template.module';
import { AwsS3Service } from './aws-s3/aws-s3.service';
import { ConsentFormsModule } from './consent-forms/consent-forms.module';
import { EventConsentFormsModule } from './event-consent-forms/event-consent-forms.module';
import { SignupConsentFormsModule } from './signup-consent-forms/signup-consent-forms.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DevicesModule } from './devices/devices.module';
import { MobileService } from './mobile/mobile.service';
import { MobileModule } from './mobile/mobile.module';
import config from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          ...config.get('app.database'),
          entities: [__dirname + '/**/*.entity.{ts,js}'],
        };
      },
    }),
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
    SignupConsentFormsModule,
    DevicesModule,
    MobileModule,
  ],
  controllers: [AppController],
  providers: [AppService, AwsS3Service, MobileService],
})
export class AppModule {}
