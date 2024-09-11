import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.listen(port, () => console.log(`Starting server at port ${port}`));
}

bootstrap();
