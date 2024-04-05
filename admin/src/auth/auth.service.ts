import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';
import { AdminEntity } from 'src/admin/entities/admin.entity';
import { AdminService } from 'src/admin/admin.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly adminService:AdminService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.adminService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: AdminEntity) {
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
  async refreshToken(user: AdminEntity) {
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
