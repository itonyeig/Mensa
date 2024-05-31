import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    example: 'Understanding Dependency Injection in NestJS',
  })
  @IsNotEmpty({
    message: 'Title is required',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This blog post explains how dependency injection works in NestJS and why it is beneficial for managing application complexity.',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Description is required',
  })
  content: string;

}
