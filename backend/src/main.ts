import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');
  
  // modifié par njato
  app.enableCors({
    origin: [
      'http://localhost:5173',       
      'https://tremplin-eni.me',     
      'http://134.199.235.124'       
    ],
    credentials: true,                
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });
  
  app.useGlobalPipes(new ValidationPipe({ transform: true }));


  // Swagger (optionnel)
  const config = new DocumentBuilder()
    .setTitle('Tremplin Prime API')
    .setDescription('API documentation')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 API running on port ${process.env.PORT || 3000}`);
}


bootstrap();
