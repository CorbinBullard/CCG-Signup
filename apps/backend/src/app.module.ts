import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignupModule } from './signup/signup.module';
import { ResponseService } from './response/response.service';
import { FieldsModule } from './fields/fields.module';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/dev.db', // Path to your SQLite database file
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Auto-load entity files
      synchronize: true, // Auto-sync schema (disable in production)
    }),
    // TypeOrmModule.forFeature([Field]), // ?????
    EventModule,
    FormModule,
    SignupModule,
    FieldsModule,
    ResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseService],
})
export class AppModule {}
