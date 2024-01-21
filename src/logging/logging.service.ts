import { Injectable } from '@nestjs/common';
import { configDotenv } from 'dotenv';
import { connect, Channel, Connection } from 'amqplib';
import { LogMessageDto } from './dto/log-message.dto';

configDotenv();
@Injectable()
export class LoggingService {
  private channel: Channel;
  private connection: Connection;
  private readonly rabbitMQUrl = process.env.RABBITMQ_URL;
  private readonly loggingExchangeName = process.env.LOGGING_EXCHANGE_NAME;
  private readonly loggingQueueName = process.env.LOGGING_QUEUE_NAME;
  constructor() {
    this.initRabbitMQ();
  }
  async publishLog(message: LogMessageDto) {
    if (!this.channel) {
      await this.initRabbitMQ();
    }

    try {
      this.channel.sendToQueue(
        this.loggingQueueName,
        Buffer.from(JSON.stringify(message)),
      );
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }

  private async initRabbitMQ(): Promise<void> {
    try {
      this.connection = await connect(this.rabbitMQUrl);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.loggingQueueName, { durable: true });
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }
}
