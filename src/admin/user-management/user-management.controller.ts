import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { Request } from 'express'
import { PaginationQueryDto } from 'src/shared/pagination.dto';
import { ResponseFormatter } from 'src/shared/response-formater';
import { CreateUserDto, UpdateUserDto } from 'src/shared/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidateObjectIdPipe } from 'src/pipes/objectid.pipe';
import { UserService } from 'src/user/user.service';


@ApiBearerAuth()
@ApiTags('Admin User Management')
@Controller('admin/user-management')
export class UserManagementController {
  constructor(
    private readonly userManagementService: UserManagementService,
    private readonly userService: UserService
  ) {}

  @Post('user')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ){
    await this.userManagementService.createUser(createUserDto)
    return ResponseFormatter({ message: 'User created' })
  }

  @Get('users')
  async getAllUsers(
    @Query() query: PaginationQueryDto,
  ){
    const data = await this.userManagementService.findAllUsers(query)
    return ResponseFormatter({ data })
  }

  @Patch('user/:id')
  async editUser(
    @Body() body: UpdateUserDto,
    @Param('id', ValidateObjectIdPipe) id: string,
  ){
    const data = await this.userService.update(id, body)
    return ResponseFormatter({ data})
  }
  @Delete('user/:id')
  async deleteUser(
    @Param('id', ValidateObjectIdPipe) id: string,
  ){
    const data = await this.userManagementService.deleteUser(id)
    return ResponseFormatter({ data})
  }
}
