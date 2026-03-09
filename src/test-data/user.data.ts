import { USER_NAME, USER_PASSWORD } from '../test-data/env.config';
import { UserLoginModel } from '@_src/models/userLogin.model';

export const userData: UserLoginModel = {
  userName: USER_NAME,
  userPassword: USER_PASSWORD,
};
