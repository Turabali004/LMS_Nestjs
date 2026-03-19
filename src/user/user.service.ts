import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto, RegisterUserDto } from 'src/auth/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
      constructor(@InjectModel(User.name) private userModel: Model<User>) { }

      async createUser(registerUserDto: RegisterUserDto) {
            try {
                  const userRegister = await this.userModel.create({
                        fname: registerUserDto.fname,
                        lname: registerUserDto.lname,
                        email: registerUserDto.email,
                        password: registerUserDto.password
                  })
                  return { userRegister }
            } catch (error) {
                  if (error.code === 11000 && error.keyPattern?.email) {
                        throw new ConflictException('Email already exists');
                  }
                  throw new InternalServerErrorException(error)
            }
      }

      async getUser(loginUserDto: LoginUserDto) {
            try {
                  const user = await this.userModel.findOne({ email: loginUserDto.email })
                  const verifyPassword = await bcrypt.compare(loginUserDto.password, user!.password)
                  if (!user || !verifyPassword) {
                        throw new UnauthorizedException('Invalid email and password')
                  }
                  const {
                        password: _,
                        ...userCredentials
                  } = user.toObject()
                  return userCredentials
            } catch (error) {
                  throw new InternalServerErrorException(error)
            }
      }

      async getUserById(id: string) {
            try {
                  const user = await this.userModel.findById(id)
                  return {
                        name: user!.fname + " " + user!.lname,
                        email: user!.email,
                        role: user!.role
                  }

            } catch (error) {
                  throw new InternalServerErrorException(error)
                  console.log(error)
            }
      }
}
