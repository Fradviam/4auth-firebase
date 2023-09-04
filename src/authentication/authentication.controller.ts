import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decotators/public.decorator';
import { SentryInterceptor } from 'src/common/interceptors/sentry.interceptor';

@ApiTags('Login')
@Controller('auth')
@UseInterceptors(SentryInterceptor)
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  singIn(@Body() payload: SignInDto) {
    return this.authService.SignIn(payload);
  }
}
