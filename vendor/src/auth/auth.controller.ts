import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateVendorDto } from 'src/vendor/dto/create-vendor.dto';
import { VendorService } from 'src/vendor/vendor.service';
import { RefreshjwtGuard } from './guards/refresh-jwt.guard';
import { jwtGuard } from './guards/jwt-auth.guard';
import { Roles } from './roles/roles.decorator';
import { RoleGuard } from './role/role.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private vendorService: VendorService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Roles('admin')
  @UseGuards(jwtGuard, RoleGuard)
  @Post('register')
  async registerVendor(@Body() CreateVendorDto: CreateVendorDto) {
    return await this.vendorService.createVendor(CreateVendorDto);
  }

  @UseGuards(RefreshjwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
