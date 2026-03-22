import { prepareRandomArticleData } from '@_src/factories/article.factory';
import { userData } from '@_src/test-data/user.data';
import { APIRequestContext } from '@playwright/test';

interface Headers {
  [key: string]: string;
}

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

interface ArticleData {
  title: string;
  body: string;
  date: string;
  image: string;
}
export function prepareArticlePayload(): ArticleData {
  const randomArticleData = prepareRandomArticleData();

  const articleData = {
    title: randomArticleData.articleTitle,
    body: randomArticleData.articleBody,
    date: '2026-03-20T11:02:51.237Z',
    image: 'string',
  };

  return articleData;
}
