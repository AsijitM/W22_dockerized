import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './startegies/local-strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './startegies/jwt-strategies';
import { RefreshJwtStrategy } from './startegies/refreshToken-strategy';
import { AdminEntity } from 'src/admin/entities/admin.entity';
import { AdminService } from 'src/admin/admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [
    AuthService,
    AdminService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
