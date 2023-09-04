import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(@InjectRepository(Permission) private readonly permissionRepo: Repository<Permission>) {}

  async findAll() {
    return await this.permissionRepo.find();
  }
}
