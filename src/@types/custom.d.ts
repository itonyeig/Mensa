import { User as UserI } from '../user/schemas/user.schema';

declare global {
    namespace Express {
      // Redefine Express.User to match application UserI interface/type
      interface User extends UserI {}
      
      interface Request {
        user?: User;
        admin?: import('../admin/profile/schema/admin-profile.schema').AdminProfile
      }
    }
  }
