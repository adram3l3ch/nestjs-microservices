import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CatalogModule } from './catalog.module.js';

async function bootstrap() {
  process.title = 'catalog';
  const logger = new Logger('CatalogBootstrap');
  const PORT = Number(process.env.CATALOG_TCP_PORT ?? 4011);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
    { transport: Transport.TCP, options: { host: '0.0.0.0', port: PORT } },
  );

  app.enableShutdownHooks();
  await app.listen();

  logger.log(`Catalog microservice (TCP) listening on port ${PORT}`);
}

await bootstrap();
