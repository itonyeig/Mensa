import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { UpdateUserDto } from 'src/shared/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseFormatter } from 'src/shared/response-formater';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  findUser(@Req() req: Request){
    return ResponseFormatter({ data: req.user })
  }

  @Patch()
  async update(@Req() req: Request, @Body() body: UpdateUserDto) {
    const userId = req.user._id
    const data = await this.userService.update(userId, body)
    return ResponseFormatter({ data })
  }

}
