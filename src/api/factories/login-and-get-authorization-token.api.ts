import { Headers } from '../models/headers.api.model';
import { LoginData } from '../models/login.api.model';
import { LoginRequest } from '../requests/login.request';
import { userData } from '@_src/ui/test-data/user.data';
import { APIRequestContext } from '@playwright/test';

export async function loginAndGetAuthorizationToken(request: APIRequestContext): Promise<Headers> {
  const userLoginData: LoginData = {
    email: userData.userName,
    password: userData.userPassword,
  };

  const loginRequest = new LoginRequest(request);

  const responseLogin = await loginRequest.post(userLoginData);

  //   // Validate login response
  //   expect(responseLogin.status()).toBe(200);
  const responseJson = await responseLogin.json();
  const token = responseJson.access_token;

  return {
    Authorization: `Bearer ${token}`,
  };
}
