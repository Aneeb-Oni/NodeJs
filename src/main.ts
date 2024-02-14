import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: [`${process.env.FRONT_END_URL}`, 'http://localhost:3000/'],
    },
  });


  app.useGlobalInterceptors();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const config = new DocumentBuilder()
      .setTitle('NodeJsTask')
      .setDescription('The API description')
      .setVersion('1.0')
      .addTag('nestjs')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, async () => {
    console.log(
        `The server is running on ${port} port: http://localhost:${port}/api`,
    );
  });
}
bootstrap();