import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private readonly roleRepo: Repository<Role>) {}

  async create(payload: CreateRoleDto) {
    return await this.roleRepo.save(payload);
  }

  async findAll() {
    return await this.roleRepo.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepo.findOneBy({ id: id });
    if (!role) {
      throw new NotFoundException('Role id: ${id} not found');
    }

    return role;
  }

  async update(id: number, payload: UpdateRoleDto) {
    const role = await this.roleRepo.findOneBy({ id: id });
    if (!role) {
      throw new NotFoundException('Role id: ${id} not found');
    }

    this.roleRepo.merge(role, payload);
    return this.roleRepo.save(role);
  }

  async remove(id: number) {
    const role = await this.roleRepo.findOneBy({ id: id });
    if (!role) {
      throw new NotFoundException('Role id: ${id} not found');
    }

    return this.roleRepo.softDelete(id);
  }
}
