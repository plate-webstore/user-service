import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly secretKey = process.env.ENCRYPTION_KEY;

  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.secretKey, 'hex'),
      iv,
    );
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  decrypt(hash: string): string {
    const parts = hash.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.secretKey, 'hex'),
      iv,
    );
    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decrypted.toString();
  }
}
