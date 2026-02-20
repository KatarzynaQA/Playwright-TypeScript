import { randomArticleData } from '../../src/factories/article.factory copy';
import { NewArticleData } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { userData } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Create and verify article', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let welcomePage: WelcomePage;
  let articlePage: ArticlePage;
  let articleData: NewArticleData;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    welcomePage = new WelcomePage(page);
    articlePage = new ArticlePage(page);
  });

  test('User can create a new article', { tag: '@GAD-R04-01' }, async ({ page }) => {
    // Arrange:
    articleData = randomArticleData();

    await loginPage.goto();
    await loginPage.loginUser(userData);
    await welcomePage.clickArticlesButton();
    await articlesPage.addArticleButton.click();

    // Act:
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);

    // Assert:
    await expect
      .soft(articlesPage.addArticleFormComponent.saveAlertPopup)
      .toHaveText('Article was created');

    await expect(articlePage.articleTitle).toHaveText(articleData.articleTitle);
  });

  test('User can access single article', { tag: '@GAD-R04-03' }, async ({ page }) => {
    // Arrange:
    await loginPage.goto();
    await loginPage.loginUser(userData);
    await articlesPage.goto();

    // Act:
    await articlesPage.goToArticle(articleData.articleTitle);

    // Assert:
    await expect(articlePage.articleTitle).toHaveText(articleData.articleTitle);
  });
});
