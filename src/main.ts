import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PromptService } from './prompt.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);

  const prompt = new PromptService();
  prompt.getPrompt();
}
bootstrap();
