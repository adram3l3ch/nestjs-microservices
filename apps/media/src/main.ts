import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MediaModule } from './media.module.js';

async function bootstrap() {
  process.title = 'media';
  const logger = new Logger('MediaBootstrap');
  const PORT = Number(process.env.MEDIA_TCP_PORT ?? 4012);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MediaModule,
    { transport: Transport.TCP, options: { host: '0.0.0.0', port: PORT } },
  );

  app.enableShutdownHooks();
  await app.listen();

  logger.log(`Media microservice (TCP) listening on port ${PORT}`);
}

await bootstrap();
