import { Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { ResponseFormatter } from 'src/shared/response-formater';
import { LoginDto } from 'src/shared/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Auth')
@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto){
    const data = await this.authService.login(loginDto)
    
    return ResponseFormatter({ data })
  }


}
