import { Body, Controller, Post } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/shared/create-user.dto';
import { ResponseFormatter } from 'src/shared/response-formater';


@ApiBearerAuth()
@ApiTags('Admin User')
@Controller('admin')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post('create-admin')
  async createAdmin(
    @Body() createUserDto: CreateUserDto,
  ){
    await this.adminUserService.createUser(createUserDto, 'admin')
    return ResponseFormatter({message: 'Admin created'})
  }
  @Post('create-user')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ){
    await this.adminUserService.createUser(createUserDto, 'user')
    return ResponseFormatter({message: 'User created'})
  }
}
