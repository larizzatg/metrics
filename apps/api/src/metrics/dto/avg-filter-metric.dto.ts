import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { MetricInterval } from '../metrics-intervals.enum'

export class AvgFilterMetricDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsOptional()
  @IsEnum(MetricInterval)
  readonly interval: MetricInterval = MetricInterval.DAY

  @IsOptional()
  @IsDateString()
  readonly startDate?: string

  @IsOptional()
  @IsDateString()
  readonly endDate?: string

  @IsOptional()
  @IsString()
  readonly timeZone?: string
}
