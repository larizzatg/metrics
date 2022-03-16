import {
  BadRequestException,
  HttpStatus,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TestingModule, Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as request from 'supertest'
import { testConfigValidationSchema } from '../../src/config.schema'
import { MetricsModule } from '../../src/metrics/metrics.module'
import { CreateMetricDto } from '../../src/metrics/dto/create-metric.dto'

describe('[Feature] Metrics - /metrics', () => {
  const metric = {
    name: 'cpu temperature',
    value: 50,
  }
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MetricsModule,
        ConfigModule.forRoot({
          validationSchema: testConfigValidationSchema,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            autoLoadEntities: true,
            // disable on prod
            synchronize: true,
            host: configService.get('DB_HOST'),
            port: configService.get('TEST_DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            dropSchema: true,
          }),
        }),
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.enableCors({
      origin: '*',
      methods: '*',
      allowedHeaders: '*',
    })
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        validationError: { target: false, value: false },
        exceptionFactory: (errors: ValidationError[]) => {
          return new BadRequestException(errors)
        },
      }),
    )
    await app.init()
  })

  it('Create metric [POST /]', () => {
    return request(app.getHttpServer())
      .post('/metrics')
      .send(metric as CreateMetricDto)
      .expect(HttpStatus.CREATED)
  })

  it('Get all metrics names [Get /]', async () => {
    const response = await request(app.getHttpServer()).get('/metrics')
    expect(response.status).toEqual(HttpStatus.OK)
    expect(response.body).toContainEqual({ name: metric.name })
  })

  it.todo('Get metrics average [Get /avg]')

  afterAll(async () => {
    await app.close()
  })
})
