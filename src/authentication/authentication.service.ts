import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async SignIn(payload: SignInDto) {
    const user = await this.userService.findOneByUser(payload.user);
    const passwordMatch = await bcrypt.compare(payload.password, user.password);

    if (!user || !passwordMatch) {
      throw new UnauthorizedException();
    }

    delete user.password;
    const jwtData = { sub: user.id, user: user.user };
    return {
      access_token: await this.jwtService.signAsync(jwtData),
    };
  }
}
