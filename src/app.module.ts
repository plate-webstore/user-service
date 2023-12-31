import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { configDotenv } from 'dotenv';
import { EncryptionService } from './encryption/encryption.service';
import { EncryptionModule } from './encryption/encryption.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { LoggingModule } from './logging/logging.module';
import { RequestLoggingService } from './logging/request-logging.service';

configDotenv();

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    EncryptionModule,
    SharedModule,
    AuthModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService, EncryptionService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(RequestLoggingService)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
