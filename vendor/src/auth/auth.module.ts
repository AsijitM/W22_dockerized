import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorEntity } from 'src/vendor/entities/vendor.entity';
import { VendorService } from 'src/vendor/vendor.service';
import { LocalStrategy } from './startegies/local-strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './startegies/jwt-strategies';
import { RefreshJwtStrategy } from './startegies/refreshToken-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([VendorEntity]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [
    AuthService,
    VendorService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
