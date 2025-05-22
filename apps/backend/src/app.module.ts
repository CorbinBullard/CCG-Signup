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
import { DropboxController } from './dropbox/dropbox.controller';
import { DropboxService } from './dropbox/dropbox.service';
import { DropboxModule } from './dropbox/dropbox.module';
import { FormTemplateModule } from './form-template/form-template.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
