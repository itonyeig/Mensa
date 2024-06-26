import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
class BaseCreateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user', type: String })
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsNotEmpty()
  readonly lastname: string;


}

export class CreateUserDto extends BaseCreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email address of the user' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  
  @ApiProperty({ example: 'strongPassword123!', description: 'The password for the user account', minLength: 8 })
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}

export class UpdateUserDto extends PartialType(BaseCreateUserDto) {}
