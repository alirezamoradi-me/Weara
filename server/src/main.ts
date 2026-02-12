import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();