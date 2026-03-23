import { prepareRandomArticleData } from '@_src/factories/article.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Create, verify and delete article', () => {
  let articlesPage: ArticlesPage;

  let articlePage: ArticlePage;
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);

    articlePage = new ArticlePage(page);

    await articlesPage.goto();
  });

  test('User can create a new article', { tag: ['@GAD-R04-01', '@logged'] }, async () => {
    // Arrange:
    articleData = prepareRandomArticleData();
    const expectedSuccessMessage = 'Article was created';

    await articlesPage.addArticleButton.click();

    // Act:
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);

    // Assert:
    await expect
      .soft(articlesPage.addArticleFormComponent.saveAlertPopup)
      .toHaveText(expectedSuccessMessage);

    await expect(articlePage.articleTitle).toHaveText(articleData.articleTitle);
  });

  test('User can access single article', { tag: ['@GAD-R04-03', '@logged'] }, async () => {
    // Arrange:

    // Act:
    await articlesPage.goToArticle(articleData.articleTitle);

    // Assert:
    await expect(articlePage.articleTitle).toHaveText(articleData.articleTitle);
  });

  test('User can delete his own article', { tag: ['@GAD-R04-04', '@logged'] }, async () => {
    // Arrange:
    const expectedPageTitle = 'Articles';

    await articlesPage.goto();
    await articlesPage.goToArticle(articleData.articleTitle);

    // Act:
    await articlePage.clickDeleteButton();

    // Assert:
    await articlesPage.waitForPageLoadUrl();
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedPageTitle);
  });
});
