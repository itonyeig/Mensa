import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/shared/login.dto';
import { ResponseFormatter } from 'src/shared/response-formater';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  async login(@Body() loginDto: LoginDto){
    const data = await this.authService.login(loginDto)
    
    return ResponseFormatter({ data })
  }
}
