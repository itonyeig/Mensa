import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/shared/create-user.dto';
import { hashPassord, handleCreateUserError } from 'src/shared/helpers';
import { PaginationQueryDto } from 'src/shared/pagination.dto';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAllUsers(paginationQueryDto: PaginationQueryDto){

    const query: any = {}
    const { limit, page } = paginationQueryDto
    const size = +limit;
    const currentPage = +page;

    const total = await this.userModel.countDocuments(query)
    const totalPages = Math.ceil(total / size);

    const content = await this.userModel
    .find(query, '-password')
    .lean()
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * size)
    .limit(size)
    
    return {
      content,
      total,
      currentPage,
      totalPages
    }
    
  }

  async createUser(createUserDto: CreateUserDto){
    try {
      const hashedPassword = await hashPassord(createUserDto.password)
      const userWithHashedPassword = {
          ...createUserDto,
          password: hashedPassword,
        };
      return await this.userModel.create(userWithHashedPassword)
      
    } catch (error) {
      handleCreateUserError(error)
    }
  }

  async deleteUser(userId: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
        throw new NotFoundException('User not found or already deleted');
    }
}
}
