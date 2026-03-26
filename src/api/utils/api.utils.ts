import { prepareRandomArticleData } from '@_src/ui/factories/article.factory';
import { prepareRandomCommentData } from '@_src/ui/factories/comment.factory';
import { userData } from '@_src/ui/test-data/user.data';
import { APIRequestContext } from '@playwright/test';

export const apiLinks = {
  articlesUrl: 'api/articles',
  commentsUrl: 'api/comments',
};
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

interface CommentData {
  article_id: number;
  body: string;
  date: string;
}

export function prepareCommentPayload(articleId: number): CommentData {
  const randomCommentData = prepareRandomCommentData();

  const commentData = {
    article_id: articleId,
    body: randomCommentData.commentBody,
    date: '2024-06-30T15:44:31Z',
  };
  return commentData;
}
