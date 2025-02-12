import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /**
   * Swagger Configuration
   */

  const config = new DocumentBuilder()
    .setTitle('NestJs - Blog App API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense(
      'MIT Lincense',
      'httpS://github.com/git/git-scm.com/blob/main/MIT-LISENCE.txt',
    )
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  //Instantiate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('blogApi', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
