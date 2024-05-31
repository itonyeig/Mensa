import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminUser, AdminUserDocument } from './schema/admin-user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/shared/create-user.dto';
import { handleCreateUserError, hashPassord } from 'src/shared/helpers';
import { User, UserDocument } from 'src/user/schema/user.schema';


@Injectable()
export class AdminUserService {
  constructor(
    @InjectModel(AdminUser.name) private adminUserModel: Model<AdminUserDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto, userType: 'admin' | 'user'){
    try {
      const hashedPassword = await hashPassord(createUserDto.password)
      const userWithHashedPassword = {
          ...createUserDto,
          password: hashedPassword,
        };
      
      if (userType === 'admin') {
        return await this.adminUserModel.create(userWithHashedPassword)
      } else if(userType === 'user'){
        return await this.userModel.create(userWithHashedPassword)
      }
    } catch (error) {
      handleCreateUserError(error)
    }
  }

  async findByEmail(email: string): Promise<AdminUser>{
    return await this.adminUserModel.findOne({ email }).lean()
  }
  
  async findById(userId: string): Promise<AdminUser>{
    return await this.adminUserModel.findById(userId).lean()
  }
}
