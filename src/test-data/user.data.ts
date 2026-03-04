import { UserLoginModel } from '../models/userLogin.model';

export const userData: UserLoginModel = {
  userName: process.env.USER_NAME ?? '[NOT SET]',
  userPassword: process.env.USER_PASSWORD ?? '[NOT SET]',
};
