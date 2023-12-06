import { Module } from '@nestjs/common';
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

configDotenv();

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    EncryptionModule,
    SharedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, EncryptionService],
})
export class AppModule {}
