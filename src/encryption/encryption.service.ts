import { Injectable } from '@nestjs/common';
import { configDotenv } from 'dotenv';

configDotenv();
@Injectable()
export class EncryptionService {
  private static readonly ALGORITHM = 'aes-256-ctr';
  private static readonly SECRET_KEY = process.env.SECRET_KEY;
}
