import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("tremplin/api/v1");
  
  // ✅ MODIFIÉ : Configuration CORS avec credentials pour authentification cross-origin
  app.enableCors({
    origin: [
      'http://localhost:5173',       // Vite dev server local
      'https://tremplin-eni.me',     // Domaine production
      'http://134.199.235.124'       // IP VPS (accès direct)
    ],
    credentials: true,                // Permet cookies/JWT/sessions entre domaines
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });
  // ❌ ANCIEN CODE : app.enableCors(); (trop permissif, pas de credentials)
  
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
