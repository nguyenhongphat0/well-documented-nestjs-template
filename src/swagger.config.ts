import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

export default (app: INestApplication) => {
  const appConfig = new DocumentBuilder()
    .setTitle('NestJS Example')
    .setDescription('Backend API Documentation (for Mobile App)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const appDocument = SwaggerModule.createDocument(app, appConfig, {
    include: [AuthModule, UsersModule],
  });
  SwaggerModule.setup('api', app, appDocument);

  const adminConfig = new DocumentBuilder()
    .setTitle('NestJS Example')
    .setDescription('Backend API Documentation (for Admin Portal)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const adminDocument = SwaggerModule.createDocument(app, adminConfig, {
    include: [AdminModule],
  });
  SwaggerModule.setup('admin/api', app, adminDocument);
};
