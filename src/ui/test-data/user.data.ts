import { USER_NAME, USER_PASSWORD } from './env.config';
import { UserLoginModel } from '@_src/ui/models/userLogin.model';

export const userData: UserLoginModel = {
  userName: USER_NAME,
  userPassword: USER_PASSWORD,
};
