import { prepareRandomArticleData } from '../src/factories/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify articles page', () => {
  // let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let welcomePage: WelcomePage;

  test.beforeEach(async ({ page }) => {
    // loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    welcomePage = new WelcomePage(page);

    // await loginPage.goto();
    // await loginPage.login(userData);

    // Restore the session by setting the cookies
    // const sessionData = JSON.parse(fs.readFileSync('session.json', 'utf-8'));
    // await page.context().addCookies(sessionData.cookies);
    // await page.context().storageState(sessionData.localStorage);
  });

  test('Should not add article with empty title', { tag: '@logged' }, async () => {
    // Arrange:
    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomArticleData();
    articleData.articleTitle = '';

    await articlesPage.goto();

    // Act:
    await articlesPage.addArticleButton.click();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);

    // Assert:
    await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
      expectedErrorMessage,
    );
  });

  test('Should not add article with empty body', { tag: ['@GAD-R04', '@logged'] }, async () => {
    // Arrange:
    const expectedErrorMessage = 'Article was not created';

    const articleData = prepareRandomArticleData();
    articleData.articleBody = '';

    // await loginPage.goto();
    // await loginPage.loginUser(userData);
    await welcomePage.clickArticlesButton();

    // Act:
    await articlesPage.addArticleButton.click();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);

    // Assert:
    await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
      expectedErrorMessage,
    );
  });

  test(
    'Article title should not exceed 128 signs',
    { tag: ['@GAD-R04-02', '@logged'] },
    async () => {
      // Arrange:
      const expectedErrorMessage = 'Article was not created';
      const articleData = prepareRandomArticleData(129);

      // await loginPage.goto();
      // await loginPage.loginUser(userData);
      await welcomePage.clickArticlesButton();

      // Act:
      await articlesPage.addArticleButton.click();
      await articlesPage.addArticleFormComponent.createNewArticle(articleData);

      // Assert:
      await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
        expectedErrorMessage,
      );
    },
  );

  test(
    'Should create article title with 128 signs',
    { tag: ['@GAD-R04-02', '@logged'] },
    async ({ page }) => {
      // Arrange:
      const expectedErrorMessage = 'Article was created';
      const articlePage = new ArticlePage(page);
      const articleData = prepareRandomArticleData(128);

      // await loginPage.goto();
      // await loginPage.loginUser(userData);
      await welcomePage.clickArticlesButton();

      // Act:
      await articlesPage.addArticleButton.click();
      await articlesPage.addArticleFormComponent.createNewArticle(articleData);

      // Assert:
      await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
        expectedErrorMessage,
      );

      await expect(articlePage.articleTitle).toHaveText(articleData.articleTitle);
    },
  );
});
