import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { AvgFilterMetricDto } from './dto/avg-filter-metric.dto'
import { CreateMetricDto } from './dto/create-metric.dto'
import { Metric } from './entities/metric.entity'
import { MetricsService } from './metrics.service'

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getMetricsName(): Promise<Partial<Metric>[]> {
    return this.metricsService.getMetricsName()
  }

  @Get('/avg')
  getAvgByTimestamp(
    @Query() avgFilterMetricDto: AvgFilterMetricDto,
  ): Promise<Metric[]> {
    return this.metricsService.getMetricsAvgByTimestamp(avgFilterMetricDto)
  }

  @Post()
  create(@Body() createMetricDto: CreateMetricDto): Promise<Metric> {
    return this.metricsService.createMetric(createMetricDto)
  }
}
