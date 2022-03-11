import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateMetricDto } from './dto/create-metric.dto'
import { Metric } from './entities/metric.entity'
import { MetricsService } from './metrics.service'

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getAll(): Promise<Metric[]> {
    return this.metricsService.getAllMetrics()
  }

  @Get('/avg')
  getAvgByTimestamp(): Promise<Metric[]> {
    return this.metricsService.getMetricsAvgByTimestamp()
  }

  @Post()
  create(@Body() createMetricDto: CreateMetricDto): Promise<Metric> {
    return this.metricsService.createMetric(createMetricDto)
  }
}
