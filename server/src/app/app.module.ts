import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import database from 'src/configs/database.config';

import UsersModule from 'src/users/users.module';
import AuthModule from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [database]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ ConfigService ],
      useFactory: (service: ConfigService) => ({
        type: "postgres",
        port: service.get("database.port"),
        username: service.get("database.userName"),
        password: service.get("database.password"),
        database: service.get("database.name"),
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
