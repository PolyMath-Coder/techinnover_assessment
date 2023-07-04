import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix(GlobalRoute.PREFIX);

  await app.listen(3000);
}
bootstrap();
