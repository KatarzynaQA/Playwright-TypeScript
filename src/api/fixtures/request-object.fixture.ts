import { loginAndGetAuthorizationToken } from '../factories/login-and-get-authorization-token.api';
import { ArticlesRequest } from '../requests/articles.request';
import { CommentsRequest } from '../requests/comments.request';
import { test as baseTest } from '@playwright/test';

interface Requests {
  articlesRequest: ArticlesRequest;
  articlesRequestLogged: ArticlesRequest;
  commentsRequest: CommentsRequest;
  commentsRequestLogged: CommentsRequest;
}

export const requestsObjectTest = baseTest.extend<Requests>({
  articlesRequest: async ({ request }, use) => {
    const articlesRequest = new ArticlesRequest(request);
    await use(articlesRequest);
  },

  articlesRequestLogged: async ({ request }, use) => {
    const headers = await loginAndGetAuthorizationToken(request);
    const articlesRequest = new ArticlesRequest(request, headers);
    await use(articlesRequest);
  },

  commentsRequest: async ({ request }, use) => {
    const commentsRequest = new CommentsRequest(request);
    await use(commentsRequest);
  },

  commentsRequestLogged: async ({ request }, use) => {
    const headers = await loginAndGetAuthorizationToken(request);
    const commentsRequest = new CommentsRequest(request, headers);
    await use(commentsRequest);
  },
});
