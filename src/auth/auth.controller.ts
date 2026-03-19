import { Controller, Get, Body, Post, Request, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginUserDto, RegisterUserDto } from './registerUser.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
      constructor(private readonly authService: AuthService, private readonly userService: UserService) { }
      @Post("/register")
      register(@Body() registerUserDto: RegisterUserDto) {
            const result = this.authService.register(registerUserDto)
            return result
      }

      @Post("/login")
      login(@Body() loginUserDto: LoginUserDto) {
            const result = this.authService.loginUser(loginUserDto)
            return result
      }

      // @UseGuards(AuthGuard)
      @Get(":id")
      // getUserById(@Request() req, id: string) {
      getUserById(@Param('id') id: string) {
            // const userId = req.user.sub
            console.log(id)
            const user = this.userService.getUserById(id)
            return user
      }
}
