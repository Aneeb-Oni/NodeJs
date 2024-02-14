import common_1, {
  BadRequestException,
  Body,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schema/user.schema';
import JwtTokensInterface from '../../interfaces/jwt-token.interfac';
import signupUserInterface from './interfaces/signup-user.interface';
import changeUserPasswordInterface from './interfaces/change-user-password.interface';
import randomUserTokenInterface from './interfaces/random-user-token.dto';
import { generateRandomToken } from '../../helpers/randomtoken.helper';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import changeUserPasswordTokenVerificationInterface from './interfaces/change-user-password-token-verification.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import RefreshTokenDto from './dto/refresh-token.dto';
import AuthRepository from './auth.repository';
import DecodedUser from './interfaces/decoded-user.interface';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private repository: AuthRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // Sign up
  async signup(@Body() Signup: signupUserInterface) {
    const Email = await this.usersService.findUserByEmail(Signup.email);
    if (Email) {
      throw new ConflictException('Email already exists');
    }

    const { password } = Signup;
    if (Signup.password !== Signup.confirmPassword) {
      throw new NotAcceptableException('Passwords do not match');
    }

    const isPasswordStrongEnough = password.match(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    );

    if (!isPasswordStrongEnough) {
      throw new BadRequestException('Password is too weak');
    }

    const user = await this.usersService.createUser({
      name: Signup.name,
      email: Signup.email,
      roles: Signup.roles,
      password: await AuthService.hashPassword(password),
    });
    if (!user) {
      throw new ForbiddenException();
    }
    await this.usersService.setUserActive(user.id);
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };
    const _user = await this.usersService.getAllUserDataByUserId(user.id);
    const successMessage = 'Account created successfully';
    if (!_user) {
      throw new ForbiddenException();
    }
    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
      message: successMessage,
    };
  }

  // Login
  async login(user: User): Promise<JwtTokensInterface> {
    // Data that needs to be signed with JWT
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };
    const _user = await this.usersService.getAllUserDataByUserId(user.id);
    const successMessage = 'Login successful';
    if (!_user) {
      throw new ForbiddenException();
    }
    return {
      ..._user,
      access_token: this.jwtService.sign(payload),
      message: successMessage,
    };
  }

  //change user password token verification
  async tokenVerification(
    @Body() reqBody: changeUserPasswordTokenVerificationInterface,
  ) {
    const user = await this.usersService.findUserByEmail(reqBody.email);
    if (!user) {
      throw new NotFoundException('Invalid email');
    }

    const tokenKey = `forgot-password-token:${user.email}`;

    const cachedToken = await this.cacheManager.get(tokenKey);

    if (!cachedToken) {
      throw new UnauthorizedException('token expired');
    }

    const parsedToken = JSON.parse(<string>cachedToken);
    if (parsedToken.token !== reqBody.token) {
      throw new UnauthorizedException('Invalid token');
    } else {
      parsedToken.active = true;
      const updatedTokenValue = JSON.stringify(parsedToken);
      await this.cacheManager.set(tokenKey, updatedTokenValue, { ttl: 5400 });
    }

    return {
      statusCode: 201,
      message: 'Token is active and valid',
      tokenStatus: true,
    };
  }

  // profile get
  async getProfile(token: string) {
    const decodedUser: DecodedUser | null = await this.verifyToken(
      token,
      process.env.JWT_SECRET ?? '',
    );

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    return decodedUser;
  }

  deleteTokenByKey(email: string): Promise<number> {
    return this.repository.removeToken(email);
  }

  public async verifyToken(
    token: string,
    secret: string,
  ): Promise<DecodedUser | null> {
    try {
      return (await this.jwtService.verifyAsync(token, {
        secret,
      })) as DecodedUser | null;
    } catch (error) {
      return null;
    }
  }

  // Generating hashed password
  private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  //used for validation purpose
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Invalid email');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new NotFoundException('Invalid password');
    }

    return user;
  }

  // get all users
  async getAllUser(): Promise<User[]> {
    const user = await this.usersService.getAllUser();
    return user;
  }

}
