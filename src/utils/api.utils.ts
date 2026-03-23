import { prepareRandomArticleData } from '@_src/factories/article.factory';
import { prepareRandomCommentData } from '@_src/factories/comment.factory';
import { userData } from '@_src/test-data/user.data';
import { APIRequestContext } from '@playwright/test';

export const apiLinks = {
  articlesUrl: 'api/articles',
  commentsUrl: 'api/comments',
};
export interface Headers {
  [key: string]: string;
}
export interface ArticleDataPayload {
  title: string;
  body: string;
  date: string;
  image: string;
}

export interface CommentDataPayload {
  article_id: number;
  body: string;
  date: string;
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

export function prepareArticlePayload(): ArticleDataPayload {
  const randomArticleData = prepareRandomArticleData();

  const articleData = {
    title: randomArticleData.articleTitle,
    body: randomArticleData.articleBody,
    date: '2026-03-20T11:02:51.237Z',
    image: 'string',
  };

  return articleData;
}

export function prepareCommentPayload(articleId: number): CommentDataPayload {
  const randomCommentData = prepareRandomCommentData();

  const commentData = {
    article_id: articleId,
    body: randomCommentData.commentBody,
    date: '2024-06-30T15:44:31Z',
  };
  return commentData;
}
