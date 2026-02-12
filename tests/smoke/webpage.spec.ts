import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Test', () => {
  test('Home page title contains sentence "GAD"', { tag: '@GAD-R01-01' }, async ({ page }) => {
    //Arrange
    const homePage = new HomePage(page);
    //Act
    await homePage.goto();

    //Assert
    const title = await homePage.getTitle();
    expect(title).toContain('GAD');
  });

  test(
    'User can access without logging in to Articles and Comments pages',
    { tag: '@GAD-R01-02' },
    async ({ page }) => {
      //Arrange
      const articlesPage = new ArticlesPage(page);

      //Act
      await articlesPage.goto();

      //Assert
      const title = await articlesPage.getTitle();
      expect(title).toContain('Articles');
    },
  );

  test(
    'User can access without logging in to Comments pages',
    { tag: '@GAD-R01-02' },
    async ({ page }) => {
      //Arrange
      const commentsPage = new CommentsPage(page);

      //Act
      await commentsPage.goto();

      //Assert
      const title = await commentsPage.getTitle();
      expect(title).toContain('Comments');
    },
  );
});
