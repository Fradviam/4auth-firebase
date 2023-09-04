import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsService } from '../services/permissions.service';
import { SentryInterceptor } from 'src/common/interceptors/sentry.interceptor';

@ApiTags('Permissions')
@Controller('permissions')
@UseInterceptors(SentryInterceptor)
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }
}
