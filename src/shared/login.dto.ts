import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, Matches } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ description: 'Email Address Of User', type: String, example: 'john.doe@example.com' })
    email: string;
  
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'Password too weak',
    })
    @ApiProperty({ description: 'Password', type: String, example: 'strongPassword123!' })
    password: string;
  }