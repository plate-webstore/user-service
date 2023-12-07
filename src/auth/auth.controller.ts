import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../shared/dto/create-user.dto';
import { SignInUserDto } from '../shared/dto/sign-in-user.dto';

@ApiTags('Auth controller')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register user' })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Sign in user' })
  @Post('login')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signIn(signInUserDto);
  }

  @ApiOperation({ summary: 'Verify token' })
  @Get('verify/:token')
  verify(@Param('token') token: string) {
    return this.authService.verify(token);
  }
}
