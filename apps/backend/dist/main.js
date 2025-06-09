"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
    }));
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://10.0.2.2:8000',
            'http://localhost:8081',
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
        allowedHeaders: ['Authorization', 'Content-Type'],
    });
    app.setGlobalPrefix('api', {
        exclude: [''],
    });
    await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
//# sourceMappingURL=main.js.map