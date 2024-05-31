import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from 'src/shared/create-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findById(userId: string): Promise<User>{
    return await this.userModel.findById(userId).lean()
  }

  async findByEmail(email: string): Promise<User>{
    return await this.userModel.findOne({ email }).lean()
  }

  async comparePassword(passwordDto: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(passwordDto, userPassword);
  }

  async update(userId: Types.ObjectId | string, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true } 
    );

    if (!result) {
      throw new BadRequestException();
    }
    const updatedUser = result.toObject()
    delete updatedUser.password
    return updatedUser;
  }
}
