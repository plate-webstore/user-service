import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
