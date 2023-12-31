import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { RequestLoggingService } from './request-logging.service';
@Module({
  providers: [LoggingService, RequestLoggingService],
  exports: [LoggingService, RequestLoggingService],
})
export class LoggingModule {}
