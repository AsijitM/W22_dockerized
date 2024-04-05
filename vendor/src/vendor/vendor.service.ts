import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorEntity } from './entities/vendor.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(VendorEntity)
    private vendorRepository: Repository<VendorEntity>,
  ) {}

  async createVendor(createVendorDto: CreateVendorDto): Promise<VendorEntity> {
    const vendor = this.vendorRepository.create(createVendorDto);
    return this.vendorRepository.save(vendor);
  }

  findAll(): Promise<VendorEntity[]> {
    return this.vendorRepository.find({ select: ['id', 'username', 'role'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} vendor`;
  }
  async findOneByUsername(username: string): Promise<VendorEntity | undefined> {
    return this.vendorRepository.findOne({ where: { username } });
  }
  update(id: number, updateVendorDto: UpdateVendorDto) {
    return `This action updates a #${id} vendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendor`;
  }
}
