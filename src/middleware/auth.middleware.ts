import { Injectable, Logger, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";
import { Request, Response, NextFunction } from 'express';




@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  
  async use(req: Request, res: Response, next: NextFunction) {
    let token = req.headers['authorization'] as string;
    // console.log('request headers ', req.headers)
    if (!token) {
      throw new UnauthorizedException()
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    try {
      const decoded = await this.authService.verifyAuthToken(token);
      // console.log('decoded ', decoded)
      const user = await this.userService.findById(decoded.sub);
      
      delete user.password

      req.user = user
      next();
    } catch (error) {
      Logger.error('Error in AuthenticationMiddleware: ' + error);
      console.log('Error in AuthenticationMiddleware: ',error)
      throw error
    }
  }
}