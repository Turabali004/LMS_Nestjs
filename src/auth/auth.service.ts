import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto, RegisterUserDto } from './registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
      constructor(private readonly userService: UserService, private jwtService: JwtService) { }
      async register(registerUserDto: RegisterUserDto) {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(registerUserDto.password, saltOrRounds);

            const user = await this.userService.createUser({ ...registerUserDto, password: hash })
            // console.log("store user in authservice", user)
            return { message: "register created successfully", user: user }
            // return {message: "register created successfully"}
      }

      async loginUser(LoginUserDto: LoginUserDto) {
            try {
                  
                  const user = await this.userService.getUser({email:LoginUserDto.email, password:LoginUserDto.password})
                  const payload = { sub: user!._id, userRole: user!.role };
                  return { message: "user logged in successfully", user, token: this.jwtService.sign(payload) }
      
            } catch (error) {
                  
            }
      }
}
