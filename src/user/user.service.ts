import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'src/auth/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
      constructor(@InjectModel(User.name) private userModel: Model<User>) { }

      async createUser(registerUserDto: RegisterUserDto) {
            const userRegister = await this.userModel.create({
                  fname: registerUserDto.fname,
                  lname: registerUserDto.lname,
                  email: registerUserDto.email,
                  password: registerUserDto.password
            })
            return { userRegister }
      }
}
