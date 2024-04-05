import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminEntity } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminsRepository: Repository<AdminEntity>,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    const newAdmin = await this.adminsRepository.create(createAdminDto);
    return await this.adminsRepository.save(newAdmin);
  }
  findAll() {
    return `This action returns all admin`;
  }
  async findOneByUsername(username: string): Promise<AdminEntity | undefined> {
    return this.adminsRepository.findOne({ where: { username } });
  }
  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
