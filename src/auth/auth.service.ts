import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './registerUser.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
      constructor(private readonly userService: UserService){}
      async register(registerUserDto: RegisterUserDto){
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(registerUserDto.password, saltOrRounds);

            const user = await this.userService.createUser({...registerUserDto, password: hash})
            console.log("store user in authservice", user)
           return {}
            // return {message: "register created successfully"}
      }
}
