import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppModule } from './app.module';
import type { CorsConfig, NestConfig } from './common/configs/config.interface';
import { Logger } from '@nestjs/common';
import { ExceptionInterceptor } from './common/interceptors/exeption.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { custom_validation_pipe } from './common/utils/custom_validation_pipe';
import { PrismaService } from './common/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(custom_validation_pipe);

  // enable shutdown hook
  const prismaService: PrismaService = await app.resolve(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');

  // Cors
  if (corsConfig.enabled) {
    app.enableCors();
  }

  // Interceptors
  app.useGlobalInterceptors(
    new ExceptionInterceptor(),
    new LoggingInterceptor()
  );

  await app.listen(process.env.PORT || nestConfig.port || 3000);
  Logger.log(
    `🚀 Application is running on: http://localhost:${nestConfig.port}/graphql`
  );
}
bootstrap();
