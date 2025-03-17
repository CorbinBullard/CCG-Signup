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
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
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
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map