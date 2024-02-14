import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { User } from '../modules/users/schema/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    try {
      return await this.authService.validateUser(email, password);
    } catch (error) {
      // console.log('error: ', error);
      throw new NotFoundException('Invalid email or password');
    }
  }
}
