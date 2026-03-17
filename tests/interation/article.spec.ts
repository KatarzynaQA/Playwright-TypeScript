import { prepareRandomArticleData } from '@_src/factories/article.factory';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { waitForResponse } from '@_src/utils/wait.util';
import { expect, test } from '@playwright/test';

test.describe('Verify articles page', () => {
  // let loginPage: LoginPage;
  let articlesPage: ArticlesPage;

  test.beforeEach(async ({ page }) => {
    // loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    await articlesPage.goto();

    // await loginPage.goto();
    // await loginPage.login(userData);

    // Restore the session by setting the cookies
    // const sessionData = JSON.parse(fs.readFileSync('session.json', 'utf-8'));
    // await page.context().addCookies(sessionData.cookies);
    // await page.context().storageState(sessionData.localStorage);
  });

  test(
    'Should not add article with empty title',
    { tag: ['@GAD-R07-03', '@logged'] },
    async ({ page }) => {
      // Arrange:
      const expectedErrorMessage = 'Article was not created';
      const expectedAPIErrorMessage = 422;

      const articleData = prepareRandomArticleData();
      articleData.articleTitle = '';

      const responsePromise = waitForResponse(page, '/api/articles');

      // Act:
      await articlesPage.clickAddArticleButton();
      await articlesPage.addArticleFormComponent.createNewArticle(articleData);

      const response = await responsePromise;

      // Assert:
      await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
        expectedErrorMessage,
      );
      expect(response.status()).toBe(expectedAPIErrorMessage);
    },
  );

  test(
    'Should not add article with empty body',
    { tag: ['@GAD-R04', '@GAD-R07-03', '@logged'] },
    async ({ page }) => {
      // Arrange:
      const expectedErrorMessage = 'Article was not created';
      const expectedResponseCode = 422;

      const articleData = prepareRandomArticleData();
      articleData.articleBody = '';

      const responsePromise = waitForResponse(page, '/api/articles');
      // await loginPage.goto();
      // await loginPage.loginUser(userData);
      // await articlesPage.goto();

      // Act:
      await articlesPage.addArticleButton.click();
      await articlesPage.addArticleFormComponent.createNewArticle(articleData);

      const response = await responsePromise;

      // Assert:
      await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
        expectedErrorMessage,
      );
      expect(response.status()).toBe(expectedResponseCode);
    },
  );

  test(
    'Article title should not exceed 128 signs',
    { tag: ['@GAD-R04-02', '@GAD-R07-03', '@logged'] },
    async ({ page }) => {
      // Arrange:
      const expectedErrorMessage = 'Article was not created';
      const expectedResponseCode = 422;

      const articleData = prepareRandomArticleData(129);

      // await loginPage.goto();
      // await loginPage.loginUser(userData);

      // Act:
      const responsePromise = waitForResponse(page, '/api/articles');

      await articlesPage.addArticleButton.click();
      await articlesPage.addArticleFormComponent.createNewArticle(articleData);

      const response = await responsePromise;

      // Assert:
      await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
        expectedErrorMessage,
      );
      expect(response.status()).toBe(expectedResponseCode);
    },
  );

  test(
    'Should create article title with 128 signs',
    { tag: ['@GAD-R04-02', '@GAD-R07-03', '@logged'] },
    async ({ page }) => {
      // Arrange:
      const expectedErrorMessage = 'Article was created';
      const expectedResponseCode = 201;

      const articlePage = new ArticlePage(page);
      const articleData = prepareRandomArticleData(128);

      // await loginPage.goto();
      // await loginPage.loginUser(userData);

      // Act:
      const responsePromise = waitForResponse(page, '/api/articles');

      await articlesPage.addArticleButton.click();
      await articlesPage.addArticleFormComponent.createNewArticle(articleData);
      const response = await responsePromise;

      // Assert:
      await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
        expectedErrorMessage,
      );

      await expect(articlePage.articleTitle).toHaveText(articleData.articleTitle);
      expect(response.status()).toBe(expectedResponseCode);
    },
  );

  test(
    'Should return created article from API',
    { tag: ['@GAD-R07-04', '@logged'] },
    async ({ page }) => {
      // Arrange:
      const expectedErrorMessage = 'Article was created';

      const articlePage = new ArticlePage(page);
      const articleData = prepareRandomArticleData();

      // Act:
      const responsePromise = waitForResponse(page, '/api/articles', 'GET');

      await articlesPage.addArticleButton.click();
      await articlesPage.addArticleFormComponent.createNewArticle(articleData);
      const response = await responsePromise;

      // Assert:
      await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
        expectedErrorMessage,
      );

      await expect(articlePage.articleTitle).toHaveText(articleData.articleTitle);
      expect(response.ok).toBeTruthy();
    },
  );
});
