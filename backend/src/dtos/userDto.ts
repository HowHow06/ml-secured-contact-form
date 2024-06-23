import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

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

export class UserContactFormDto {
  @IsNotEmpty()
  @Length(1, 100)
  fullname: string;

  @IsDateString()
  dob: Date;

  @IsNotEmpty()
  @Length(1, 12)
  nric: string;
}
