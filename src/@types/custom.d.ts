import { User as UserI } from '../user/schema/user.schema';

declare global {
    namespace Express {
      // Redefine Express.User to match application UserI interface/type
      interface User extends UserI {}
      
      interface Request {
        user?: User;
        admin?: import('../admin/user/schema/admin-user.schema').AdminUser
      }
    }
  }
