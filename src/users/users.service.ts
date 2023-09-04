import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async create(payload: CreateUserDto) {
    const newUser = plainToClass(User, payload);
    newUser.password = await bcrypt.hash(payload.password, 10);
    const user = await this.userRepo.save(newUser);
    delete user.password;
    return user;
  }

  async findAll() {
    const allUsers = await this.userRepo.find();
    allUsers.forEach(user => {
      delete user.password;
    })

    return allUsers;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id: id });
    delete user.password;
    if (!user) {
      throw new NotFoundException('User id:${id} not found');
    }

    return user;
  }

  async findOneByUser(userPayload: string) {
    const user = await this.userRepo.findOneBy({ user: userPayload});
    if (!user) {
      throw new NotFoundException('User ${user} not found');
    }

    return user;
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('User id:${id} not found');
    }

    this.userRepo.merge(user, payload);
    delete user.password;
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('User id:${id} not found');
    }
    return this.userRepo.softDelete(id);
  }
}
