import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { AvgFilterMetricDto } from './dto/avg-filter-metric.dto'
import { CreateMetricDto } from './dto/create-metric.dto'
import { Metric } from './entities/metric.entity'
import { MetricInterval } from './metrics-intervals.enum'
import { MetricsService } from './metrics.service'

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getMetricsName(): Promise<string[]> {
    return this.metricsService.getMetricsName()
  }

  @Get('/avg')
  getAvgByTimestamp(
    @Query() avgFilterMetricDto: AvgFilterMetricDto,
  ): Promise<Metric[]> {
    return this.metricsService.getMetricsAvgByTimestamp(avgFilterMetricDto)
  }

  // @todo: refactor, instead of making api call
  // move shared types to own package
  @Get('/intervals')
  getIntervals(): MetricInterval[] {
    return Object.values(MetricInterval)
  }

  @Post()
  create(@Body() createMetricDto: CreateMetricDto): Promise<Metric> {
    return this.metricsService.createMetric(createMetricDto)
  }
}
