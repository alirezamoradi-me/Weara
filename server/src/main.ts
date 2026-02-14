import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerConf from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: [
      "http://localhost:3000"
    ],
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization"
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  const document = SwaggerModule.createDocument(app, swaggerConf);
  SwaggerModule.setup("/docs", app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();