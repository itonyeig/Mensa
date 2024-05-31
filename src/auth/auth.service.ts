import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/shared/login.dto';
import { JWT_Decoded, JWT_Encoding } from 'src/shared/shared.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(loginDto: LoginDto){
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('Email does not exist')

    const passwordIsvalid = await this.userService.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!passwordIsvalid) {
      throw new UnauthorizedException('Email or password is incorrect')
    }

    const payload: JWT_Encoding = { sub: user._id.toString() };
    const token = await this.generateJWTtoken(payload)
    delete user.password
    return { token, user}
    
  }

  async generateJWTtoken(data: JWT_Encoding){
    const token = await this.jwtService.signAsync(data)
    return token
  }

  verifyAuthToken(token: string): Promise<JWT_Decoded> {
    return this.jwtService.verify(token); 
  }
}
