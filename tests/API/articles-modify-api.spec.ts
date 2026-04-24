import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { prepareArticlePayload } from '@_src/api/factories/article-payload.api.factory';
import { ArticlePayload } from '@_src/api/models/article-payload.api.models';
import { expect, test } from '@_src/merge.fixture';
import { APIResponse } from '@playwright/test';

test.describe('Verify articles modification operations', { tag: '@crud @api @article' }, () => {
  let responseArticle: APIResponse;
  let articleData: ArticlePayload;

  test.beforeEach('Create an article', async ({ articlesRequestLogged }) => {
    articleData = prepareArticlePayload();
    responseArticle = await createArticleWithApi(articlesRequestLogged, articleData);
  });

  test.describe('Fully modify by PUT', () => {
    test(
      'Should modify and replace content of an article with logged-in user',
      { tag: '@GAD-R10-01' },
      async ({ articlesRequestLogged }) => {
        // Arrange
        const expectedStatusCode = 200;
        const articleJson = await responseArticle.json();
        const articleId = articleJson.id;
        const modifiedArticleData = prepareArticlePayload();

        // Act
        const responseArticlePut = await articlesRequestLogged.put(articleId, modifiedArticleData);

        // Assert
        const actualResponseStatus = responseArticlePut.status();
        expect(
          actualResponseStatus,
          `expected status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
        ).toBe(expectedStatusCode);

        const articleModifyResponseJson = await responseArticlePut.json();

        expect.soft(articleModifyResponseJson.title).toEqual(modifiedArticleData.title);
        expect.soft(articleModifyResponseJson.body).toEqual(modifiedArticleData.body);
        expect.soft(articleModifyResponseJson.title).not.toEqual(articleData.title);
        expect.soft(articleModifyResponseJson.body).not.toEqual(articleData.body);
      },
    );

    test(
      'Should not modify an article with non logged-in user',
      { tag: '@GAD-R10-01' },
      async ({ articlesRequest }) => {
        // Arrange
        const expectedStatusCode = 401;
        const articleJson = await responseArticle.json();
        const articleId = articleJson.id;
        const modifiedArticleData = prepareArticlePayload();

        // Act
        const responseArticlePut = await articlesRequest.put(articleId, modifiedArticleData);

        // Assert
        const actualResponseStatus = responseArticlePut.status();
        expect(
          actualResponseStatus,
          `expected status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
        ).toBe(expectedStatusCode);

        const nonArticleModifiedResponse = await articlesRequest.getOne(articleId);
        const nonArticleModifiedResponseJson = await nonArticleModifiedResponse.json();

        expect.soft(nonArticleModifiedResponseJson.title).not.toEqual(modifiedArticleData.title);
        expect.soft(nonArticleModifiedResponseJson.body).not.toEqual(modifiedArticleData.body);
        expect.soft(nonArticleModifiedResponseJson.title).toEqual(articleData.title);
        expect.soft(nonArticleModifiedResponseJson.body).toEqual(articleData.body);
      },
    );
  });

  test.describe('Partially modify by PATCH', () => {
    test(
      'Should Partially modify and replace content of an article with logged-in user',
      { tag: '@GAD-R10-03' },
      async ({ articlesRequestLogged }) => {
        // Arrange
        const expectedStatusCode = 200;
        const articleJson = await responseArticle.json();
        const articleId = articleJson.id;
        const modifiedArticleData = {
          title: `Modified new title ${new Date().toISOString()}`,
        };

        //Act
        const responseArticlePut = await articlesRequestLogged.patch(
          articleId,
          modifiedArticleData,
        );

        // Assert
        const actualResponseStatus = responseArticlePut.status();
        expect(
          actualResponseStatus,
          `expected status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
        ).toBe(expectedStatusCode);

        const articleModifyResponseJson = await responseArticlePut.json();

        expect.soft(articleModifyResponseJson.title).toEqual(modifiedArticleData.title);
        expect.soft(articleModifyResponseJson.title).not.toEqual(articleData.title);
        expect.soft(articleModifyResponseJson.body).toEqual(articleData.body);
      },
    );
  });
});
