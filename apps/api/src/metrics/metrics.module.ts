import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MetricsController } from './metrics.controller'
import { MetricsService } from './metrics.service'
import { MetricsRepository } from './metrics.repository'

@Module({
  imports: [TypeOrmModule.forFeature([MetricsRepository])],
  controllers: [MetricsController],
  providers: [MetricsService],
})
export class MetricsModule {}
