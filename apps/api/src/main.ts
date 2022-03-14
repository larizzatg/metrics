import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
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
  await app.listen(4000)
}
bootstrap()
