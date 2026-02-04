import { Controller, Get, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './registerUser.dto';

@Controller('auth')
export class AuthController {
      constructor(private readonly authService: AuthService) {}
      @Post("/register")
      register(@Body() registerUserDto: RegisterUserDto){
            const result = this.authService.register(registerUserDto)
            return result
      }
 }
