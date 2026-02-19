import { randomArticleData } from '../../src/factories/article.factory copy';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { userData } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify articles page', () => {
  test('User can create a new article', { tag: '@GAD-R04-01' }, async ({ page }) => {
    // Arrange:
    const loginPage = new LoginPage(page);
    const articlesPage = new ArticlesPage(page);
    const welcomePage = new WelcomePage(page);
    const articlePage = new ArticlePage(page);

    await loginPage.goto();
    await loginPage.loginUser(userData);
    await welcomePage.articleButton.click();

    // Act:
    await articlesPage.addArticleButton.click();

    const articleData = randomArticleData();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);

    // Assert:
    await expect
      .soft(articlesPage.addArticleFormComponent.saveAlertPopup)
      .toHaveText('Article was created');

    await expect(articlePage.articleTitle).toHaveText(articleData.articleTitle);
  });

  test('Should not add article with empty title', async ({ page }) => {
    // Arrange:
    const loginPage = new LoginPage(page);
    const articlesPage = new ArticlesPage(page);
    const welcomePage = new WelcomePage(page);
    const articleData = randomArticleData();
    articleData.articleTitle = '';

    const expectedErrorMessage = 'Article was not created';

    await loginPage.goto();
    await loginPage.loginUser(userData);
    await welcomePage.articleButton.click();

    // Act:
    await articlesPage.addArticleButton.click();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);

    // Assert:
    await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
      expectedErrorMessage,
    );
  });

  test('Should not add article with empty body', async ({ page }) => {
    // Arrange:
    const loginPage = new LoginPage(page);
    const articlesPage = new ArticlesPage(page);
    const welcomePage = new WelcomePage(page);
    const articleData = randomArticleData();
    articleData.articleBody = '';

    const expectedErrorMessage = 'Article was not created';

    await loginPage.goto();
    await loginPage.loginUser(userData);
    await welcomePage.articleButton.click();

    // Act:
    await articlesPage.addArticleButton.click();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);

    // Assert:
    await expect(articlesPage.addArticleFormComponent.saveAlertPopup).toHaveText(
      expectedErrorMessage,
    );
  });
});
