import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get, Delete, Query, Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import JwtTokensInterface from '../../interfaces/jwt-token.interfac';
import AuthBearer from '../../decorators/auth-bearer.decorator';
import updateUserInterface from "./interfaces/update-user.interface";
import {updateUserDto} from "./dto/update-user.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Sign up
  @ApiBody({ type: SignUpUserDto })
  @Post('signup')
  async signup(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signup(signUpUserDto);
  }

  // login
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<JwtTokensInterface> {
    return this.authService.login(req.user);
  }

  // get current user
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getCurrentUser(@AuthBearer() token: string): Promise<any> {
    return this.authService.getProfile(token);
  }

  // update user
  @ApiBearerAuth()
  @ApiBody({ type: updateUserDto })
  @Patch('user/update')
  async updateUser(
      @Body() updateUserDto: updateUserDto,
  ): Promise<{ message: string; update: updateUserInterface }> {
    return this.authService.updateUser(updateUserDto);
  }

  //delete user with review with likeAndDislike
  @ApiBearerAuth()
  @Delete('user/delete')
  async deleteUser(@Query('id') id: string): Promise<{ message: string }> {
    return this.authService.deleteUser(id);
  }

}
