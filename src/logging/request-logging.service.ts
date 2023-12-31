import { Injectable } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { v4 as uuidv4 } from 'uuid';
import { NextFunction, Request, Response } from 'express';
import { LogMessageDto } from './dto/log-message.dto';

@Injectable()
export class RequestLoggingService {
  constructor(private readonly loggingService: LoggingService) {}

  // TODO: Change log shape
  async use(req: Request, res: Response, next: NextFunction) {
    const { method, path } = req;
    const correlationId =
      (req.headers['X-Correlation-Id'] as string) || uuidv4();

    if (next) next();

    res.on('finish', async () => {
      const logMessage: LogMessageDto = {
        statusCode: res.statusCode,
        timestamp: new Date().toISOString(),
        correlationId: correlationId,
        requestType: method,
        path: path,
        logLevel: this.determineLogLevel(res.statusCode),
      };

      console.log(logMessage);
      await this.loggingService.publishLog(logMessage);
    });
  }

  private determineLogLevel(statusCode: number): string {
    let logLevel: 'INFO' | 'WARN' | 'ERROR';
    if (statusCode >= 200 && statusCode < 400) {
      logLevel = 'INFO';
    } else if (statusCode >= 400 && statusCode < 500) {
      logLevel = 'WARN';
    } else if (statusCode >= 500) {
      logLevel = 'ERROR';
    } else {
      logLevel = 'INFO';
    }

    return logLevel;
  }
}
