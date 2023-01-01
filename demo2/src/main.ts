import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './exception/all.exception';
import { ValidationException } from './exception/validation.exception';
import { ValidationFilter } from './exception/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new ValidationFilter())
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: false,
    exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
            return {
                error: `${error.property} has wrong value ${error.value}.`,
                message: Object.values(error.constraints).join(''),
            }
        })
        return new ValidationException(messages);
    }
  }));

  await app.listen(3000, ()=> {
    console.log("server run at port: 3000")
  });
}
bootstrap();
