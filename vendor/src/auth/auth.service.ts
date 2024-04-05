import { Injectable } from '@nestjs/common';
import { VendorService } from 'src/vendor/vendor.service';
import * as bcrypt from 'bcryptjs';
import { VendorEntity } from 'src/vendor/entities/vendor.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly vendorService: VendorService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.vendorService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: VendorEntity) {
    const payload = {
      username: user.username,
      role: user.role,
    };
    
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
  async refreshToken(user: VendorEntity) {
    const payload = {
      username: user.username,
      role: user.role,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),

    };
  }
}
