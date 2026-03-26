import { Headers } from '../models/headers.api.model';
import { userData } from '@_src/ui/test-data/user.data';
import { APIRequestContext } from '@playwright/test';

export async function loginAndGetAuthorizationToken(request: APIRequestContext): Promise<Headers> {
  const loginUrl = 'api/login';

  const userLoginData = {
    email: userData.userName,
    password: userData.userPassword,
  };

  const responseLogin = await request.post(loginUrl, { data: userLoginData });

  //   // Validate login response
  //   expect(responseLogin.status()).toBe(200);
  const responseJson = await responseLogin.json();
  const token = responseJson.access_token;

  return {
    Authorization: `Bearer ${token}`,
  };
}
