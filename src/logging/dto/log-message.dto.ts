export interface LogMessageDto {
  statusCode: number;
  timestamp: string;
  correlationId: string;
  requestType: string;
  path: string;
  logLevel: string;
}
