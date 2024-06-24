import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import sanitizeHtml from 'sanitize-html';
import validator from 'validator';

export class UserRegisterDto {
  @IsEmail()
  @Length(8, 200)
  @Transform(({ value }) => validator.trim(value))
  @Transform(({ value }) => validator.normalizeEmail(value))
  @Transform(({ value }) => validator.escape(value))
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
  @Transform(({ value }) => validator.trim(value))
  @Transform(({ value }) => validator.escape(value))
  password: string;
}

export class UserLoginDto {
  @IsEmail()
  @Length(8, 200)
  @Transform(({ value }) => validator.trim(value))
  @Transform(({ value }) => validator.normalizeEmail(value))
  @Transform(({ value }) => validator.escape(value))
  email: string;

  @IsString()
  @Length(8, 200)
  @Transform(({ value }) => validator.trim(value))
  @Transform(({ value }) => validator.escape(value))
  password: string;
}

export class UserContactFormDto {
  @IsNotEmpty()
  @Length(1, 100)
  @Transform(({ value }) => validator.trim(value))
  @Transform(({ value }) => sanitizeHtml(value))
  fullname: string;

  @IsDateString()
  dob: Date;

  @IsNotEmpty()
  @Length(1, 12)
  @Transform(({ value }) => validator.trim(value))
  @Transform(({ value }) => validator.escape(value))
  nric: string;
}
