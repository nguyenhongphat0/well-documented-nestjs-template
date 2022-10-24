import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminLocalStrategy } from './strategies/admin-local.strategy';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { Admin } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AdminService, AdminJwtStrategy, AdminLocalStrategy],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
