import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { ResponseFormatter } from 'src/shared/response-formater';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Request } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/shared/pagination.dto';

@ApiBearerAuth()
@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('')
  async createAdmin(
    @Body() createBlogDto: CreateBlogDto,
    @Req() req: Request
  ){
    const data = await this.blogService.create(createBlogDto, req.user._id)
    return ResponseFormatter({ data })
  }

  @Get()
  async getAllBlogs(
    @Query() query: PaginationQueryDto,
  ){
    const data = await this.blogService.findAllBlogs(query)
    return ResponseFormatter({ data })
  }
}
