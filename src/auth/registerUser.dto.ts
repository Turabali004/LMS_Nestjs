import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserDto {
      @IsNotEmpty()
      fname!: string;
      @IsNotEmpty()
      lname!: string;
      @IsEmail()
      email!: string;
      @IsNotEmpty()
      password!: string;
}

// export type LoginUserDto = Pick<RegisterUserDto,  "email" | "password" >


export class LoginUserDto {
      email!: string;
      password!: string;
}
