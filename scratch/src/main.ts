import { Controller, Module, Get } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

const port = 3000;

@Controller()
class AppController {
    @Get()
    getRootRoute() {
        return 'hi there!';
    }
}

@Module({
    controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.listen(port, () => console.log(`Starting server at port ${port}`)
    )
}

bootstrap();