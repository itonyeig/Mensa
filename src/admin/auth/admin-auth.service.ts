import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_Decoded, JWT_Encoding, UserLevelType } from 'src/shared/shared.interface';
import * as bcrypt from 'bcrypt';
import { AdminUserService } from '../admin-user/admin-user.service';
import { LoginDto } from 'src/shared/login.dto';


@Injectable()
export class AdminAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminUserService: AdminUserService
  ) {}

  async verifyAuthToken(token: string): Promise<JWT_Decoded> {
    return await this.jwtService.verify(token); 
  }

  async comparePassword(passwordDto: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(passwordDto, userPassword);
  }

  async login(loginDto: LoginDto){
    const admin = await this.adminUserService.findByEmail(loginDto.email)
    if (!admin) throw new UnauthorizedException('Email does not exist')
    
      
    const passwordIsvalid = await this.comparePassword(
      loginDto.password,
      admin.password,
    );


    if (!passwordIsvalid) {
      throw new UnauthorizedException('Email or password is incorrect')
    }

    const payload: JWT_Encoding = { sub: admin._id.toString(), sub2: UserLevelType.Admin };
    const token = await this.generateJWTtoken(payload)
    delete admin.password
    
    return { token, admin}
    
  }
  async generateJWTtoken(data: JWT_Encoding){
    const token = await this.jwtService.signAsync(data)
    return token
  }
}
