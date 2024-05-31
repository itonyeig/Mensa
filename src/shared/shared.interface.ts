export interface JWT_Encoding{
    // email: string;
    sub: string;
    sub2?: UserLevelType;
}

export enum UserLevelType {
  Admin,
  User,
}


export interface JWT_Decoded{
  sub: string;
  sub2?: UserLevelType;
  iat: number;
  exp: number;
}