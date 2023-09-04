import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { SentryInterceptor } from 'src/common/interceptors/sentry.interceptor';

@ApiTags('Roles')
@Controller('roles')
@UseInterceptors(SentryInterceptor)
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Post()
  create(@Body() payload: CreateRoleDto) {
    return this.roleService.create(payload);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateRoleDto) {
    return this.roleService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
