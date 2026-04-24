import { loginAndGetAuthorizationToken } from '../factories/login-and-get-authorization-token.api';
import { ArticlesRequest } from '../requests/articles.request';
import { test as baseTest } from '@playwright/test';

interface Requests {
  articlesRequest: ArticlesRequest;
  articlesRequestLogged: ArticlesRequest;
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
});
