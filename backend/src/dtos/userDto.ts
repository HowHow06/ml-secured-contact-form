import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UserRegisterDto {
  @IsEmail()
  @Length(8, 200)
  email: string;

  @IsString()
  @Length(8, 200)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter.',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter.',
  })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number.' })
  @Matches(/[!@#$%^&*]/, {
    message: 'Password must contain at least one special character.',
  })
  password: string;
}

export class UserLoginDto {
  @IsEmail()
  @Length(8, 200)
  email: string;

  @IsString()
  @Length(8, 200)
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
