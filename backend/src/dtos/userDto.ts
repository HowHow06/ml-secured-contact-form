import { IsEmail, IsString, Length } from 'class-validator';

export class UserRegisterDto {
  @IsEmail()
  @Length(8, 200)
  email: string;

  @IsString()
  @Length(8, 100)
  password: string;
}

export class UserLoginDto {
  @IsEmail()
  @Length(8, 200)
  email: string;

  @IsString()
  @Length(8, 100)
  password: string;
}
