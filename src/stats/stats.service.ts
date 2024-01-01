import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { NextFunction, Request, Response } from 'express';
import { configDotenv } from 'dotenv';

configDotenv();
@Injectable()
export class StatsService implements NestMiddleware {
  private readonly statsServiceUrl = process.env.STATS_SERVICE_URL;
  constructor(private readonly http: HttpService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { method, path } = req;

    if (next) next();

    res.on('finish', async () => {
      const apiCallSummary = {
        timestamp: new Date().toISOString(),
        method: method,
        url: req.route.path,
        serviceName: 'user-service',
      };

      console.log(apiCallSummary);

      await this.http
        .post(`${this.statsServiceUrl}/api/stats`, apiCallSummary)
        .toPromise();
    });
  }
}
