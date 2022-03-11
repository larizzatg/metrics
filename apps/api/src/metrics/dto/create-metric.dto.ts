import { IsString, IsNumber } from 'class-validator'

export class CreateMetricDto {
  @IsString()
  readonly name: string

  @IsNumber()
  readonly value: number
}
