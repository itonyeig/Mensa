import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Blog, BlogDocument } from './schema/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PaginationQueryDto } from 'src/shared/pagination.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async create(createBlogDto: CreateBlogDto, arthur: Types.ObjectId){
    const blog: Blog = {
        ...createBlogDto,
        arthur
    }
    return await this.blogModel.create(blog)
  }

  async findAllBlogs(paginationQueryDto: PaginationQueryDto){

    const query: any = {}
    const { limit, page } = paginationQueryDto
    const size = +limit;
    const currentPage = +page;

    const total = await this.blogModel.countDocuments(query)
    const totalPages = Math.ceil(total / size);

    const content = await this.blogModel
    .find(query)
    .lean()
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * size)
    .limit(size)
    .populate({
      path: 'arthur',
      select: 'firstname lastname -_id'
    });

    return {
      content,
      total,
      currentPage,
      totalPages
    }
    
  }
}
