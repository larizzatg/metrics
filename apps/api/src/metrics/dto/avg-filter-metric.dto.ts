import { IsDateString, IsEnum, IsOptional } from 'class-validator'
import { MetricInterval } from '../metrics-intervals.enum'

export class AvgFilterMetricDto {
  @IsOptional()
  @IsEnum(MetricInterval)
  readonly interval: MetricInterval = MetricInterval.DAY

  @IsOptional()
  @IsDateString()
  readonly startDate?: string

  @IsOptional()
  @IsDateString()
  readonly endDate?: string
}
