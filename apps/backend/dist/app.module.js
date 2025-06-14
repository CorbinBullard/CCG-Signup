"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const event_module_1 = require("./event/event.module");
const form_module_1 = require("./form/form.module");
const typeorm_1 = require("@nestjs/typeorm");
const signup_module_1 = require("./signup/signup.module");
const fields_module_1 = require("./fields/fields.module");
const response_module_1 = require("./response/response.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const dropbox_module_1 = require("./dropbox/dropbox.module");
const form_template_module_1 = require("./form-template/form-template.module");
const aws_s3_service_1 = require("./aws-s3/aws-s3.service");
const consent_forms_module_1 = require("./consent-forms/consent-forms.module");
const event_consent_forms_module_1 = require("./event-consent-forms/event-consent-forms.module");
const signup_consent_forms_module_1 = require("./signup-consent-forms/signup-consent-forms.module");
const schedule_1 = require("@nestjs/schedule");
const devices_module_1 = require("./devices/devices.module");
const mobile_controller_1 = require("./mobile/mobile.controller");
const mobile_service_1 = require("./mobile/mobile.service");
const mobile_module_1 = require("./mobile/mobile.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db/dev.db',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            event_module_1.EventModule,
            form_module_1.FormModule,
            signup_module_1.SignupModule,
            fields_module_1.FieldsModule,
            response_module_1.ResponseModule,
            auth_module_1.AuthModule,
            config_1.ConfigModule,
            dropbox_module_1.DropboxModule,
            form_template_module_1.FormTemplateModule,
            consent_forms_module_1.ConsentFormsModule,
            event_consent_forms_module_1.EventConsentFormsModule,
            signup_consent_forms_module_1.SignupConsentFormsModule,
            devices_module_1.DevicesModule,
            mobile_module_1.MobileModule,
        ],
        controllers: [app_controller_1.AppController, mobile_controller_1.MobileController],
        providers: [app_service_1.AppService, aws_s3_service_1.AwsS3Service, mobile_service_1.MobileService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map