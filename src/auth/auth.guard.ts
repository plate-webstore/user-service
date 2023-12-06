import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { configDotenv } from 'dotenv';

configDotenv();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new HttpException('Unauthorized!', 403);
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      throw new HttpException('Unauthorized!', 403);
    }

    try {
      const user = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = user;
    } catch (e) {
      throw new HttpException('Unauthorized!', 403);
    }

    return true;
  }
}
