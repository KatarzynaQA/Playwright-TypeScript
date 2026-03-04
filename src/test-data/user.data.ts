import { UserLoginModel } from '../models/userLogin.model';
import { USER_NAME, USER_PASSWORD } from '../test-data/env.config';

export const userData: UserLoginModel = {
  userName: USER_NAME,
  userPassword: USER_PASSWORD,
};
