import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @MinLength(5)
  password: string
}
