import { NestFactory } from '@nestjs/core';
import { AppModule } from '@infrastructure/modules/app/app.module';
const PORT = 3000;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap().then(() => console.log(`App listening at port ${PORT}...`));
