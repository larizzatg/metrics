import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateMetricDto } from './dto/create-metric.dto'
import { MetricsService } from './metrics.service'

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getAll() {
    return this.metricsService.getAllMetrics()
  }

  @Post()
  create(@Body() createMetricDto: CreateMetricDto) {
    this.metricsService.createMetric(createMetricDto)
    return createMetricDto
  }
}