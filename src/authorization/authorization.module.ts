import { Module } from '@nestjs/common';
import { RolesController } from '../../../../develop/greco/ts-learning/src/authorization/controllers/roles.controller';
import { RolesService } from './services/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { PermissionsController } from '../../../../develop/greco/ts-learning/src/authorization/controllers/permissions.controller';
import { PermissionsService } from './services/permissions.service';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RolesController, PermissionsController],
  providers: [RolesService, PermissionsService],
})
export class AuthorizationModule {}
