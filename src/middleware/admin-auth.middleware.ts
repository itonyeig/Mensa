import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AdminAuthService } from "src/admin/auth/admin-auth.service";
import { AdminUserService } from "src/admin/user/admin-user.service";
import { AdminUser } from "src/admin/user/schema/admin-user.schema";
import { UserLevelType } from "src/shared/shared.interface";
// import { AdminProfile } from "src/admin/profile/schema/admin-profile.schema";

@Injectable()
export class AdminAuthenticationMiddleware implements NestMiddleware {
    constructor(
      private authService: AdminAuthService,
      private adminProfileService: AdminUserService,
    ) {}
  
    // private readonly logger = new Logger(AdminAuthenticationMiddleware.name);
  
    async use(req: Request, res: Response, next: NextFunction) {
      // console.log('AuthService Defined:', this.authService !== undefined);
      let token = req.headers['authorization'] as string;
      // console.log('request headers ', req.headers)
      if (!token) {
        throw new UnauthorizedException()
      }
  
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }
  
      const decoded = await this.authService.verifyAuthToken(token);
      // console.log('decoded ', decoded)
      if (decoded.sub2 !== UserLevelType.Admin) {
          throw new ForbiddenException()
      }
      const user = await this.adminProfileService.findById(decoded.sub);
      if (!user) {
        throw new ForbiddenException()
      }

      if (user) {
        console.log('user ', user)
        delete user.password;
        req.admin = user
      }
      next();
    }
}