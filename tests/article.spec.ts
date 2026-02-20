import { randomArticleData } from '../src/factories/article.factory copy';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { userData } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify articles page', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let welcomePage: WelcomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    welcomePage = new WelcomePage(page);
  });

  test('Should not add article with empty title', { tag: '@GAD-R04' }, async () => {
    // Arrange:
    const expectedErrorMessage = 'Article was not created';
    const articleData = randomArticleData();
    articleData.articleTitle = '';

    await loginPage.goto();
    await loginPage.loginUser(userData);
    await welcomePage.clickArticlesButton();

    // Act:
    await articlesPage.addArticleButton.click();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);

    // Assert:
    await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
      expectedErrorMessage,
    );
  });

  test('Should not add article with empty body', { tag: '@GAD-R04' }, async () => {
    // Arrange:
    const expectedErrorMessage = 'Article was not created';

    const articleData = randomArticleData();
    articleData.articleBody = '';

    await loginPage.goto();
    await loginPage.loginUser(userData);
    await welcomePage.clickArticlesButton();

    // Act:
    await articlesPage.addArticleButton.click();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);

    // Assert:
    await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
      expectedErrorMessage,
    );
  });

  test('Article title should not exceed 128 signs', { tag: '@GAD-R04-02' }, async () => {
    // Arrange:
    const expectedErrorMessage = 'Article was not created';
    const articleData = randomArticleData(129);

    await loginPage.goto();
    await loginPage.loginUser(userData);
    await welcomePage.clickArticlesButton();

    // Act:
    await articlesPage.addArticleButton.click();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);

    // Assert:
    await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
      expectedErrorMessage,
    );
  });

  test('Should create article title with 128 signs', { tag: '@GAD-R04-02' }, async ({ page }) => {
    // Arrange:
    const expectedErrorMessage = 'Article was created';
    const articlePage = new ArticlePage(page);
    const articleData = randomArticleData(128);

    await loginPage.goto();
    await loginPage.loginUser(userData);
    await welcomePage.clickArticlesButton();

    // Act:
    await articlesPage.addArticleButton.click();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);

    // Assert:
    await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
      expectedErrorMessage,
    );

    await expect(articlePage.articleTitle).toHaveText(articleData.articleTitle);
  });
});
