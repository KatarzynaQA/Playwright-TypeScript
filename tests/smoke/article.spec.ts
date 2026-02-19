import { randomArticleData } from '../../src/factories/article.factory copy';
import { NewArticleData } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { userData } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify articles page', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let welcomePage: WelcomePage;
  let articleData: NewArticleData;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    welcomePage = new WelcomePage(page);

    articleData = randomArticleData();
  });

  test('User can create a new article', { tag: '@GAD-R04-01' }, async ({ page }) => {
    // Arrange:
    const articlePage = new ArticlePage(page);

    await loginPage.goto();
    await loginPage.loginUser(userData);
    await welcomePage.articleButton.click();

    // Act:
    await articlesPage.addArticleButton.click();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);

    // Assert:
    await expect
      .soft(articlesPage.addArticleFormComponent.saveAlertPopup)
      .toHaveText('Article was created');

    await expect(articlePage.articleTitle).toHaveText(articleData.articleTitle);
  });

  test('Should not add article with empty title', async () => {
    // Arrange:
    const expectedErrorMessage = 'Article was not created';

    articleData.articleTitle = '';

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

  test('Should not add article with empty body', async () => {
    // Arrange:
    const expectedErrorMessage = 'Article was not created';

    articleData.articleBody = '';

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
