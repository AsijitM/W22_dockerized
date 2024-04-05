import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { VendorModule } from './vendor/vendor.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres', // Docker container name for PostgreSQL service
      port: 5432, // PostgreSQL port
      username: 'user',
      password: 'password',
      database: 'db',
      autoLoadEntities: true,
      synchronize: true, // Automatically synchronize database schema
    }),
    AuthModule,
    VendorModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
