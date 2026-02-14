import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConf = new DocumentBuilder()
  .setTitle("Weara Project API's")
  .addServer("http://localhost:3000")
  .build();

export default swaggerConf;
