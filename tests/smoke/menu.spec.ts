import { expect, test } from '../../src/fixtures/merge.fixture';
import { HomePage } from '../../src/pages/home.page';

test.describe('Verify main menu button', () => {
  test(
    'Comments button navigates to comments page',
    { tag: '@GAD-R01-03' },
    async ({ commentsPage, articlesPage }) => {
      // Arrange:
      const expectedTitle = 'Comments';

      // Act:
      await articlesPage.mainMenuComponent.commentsButton.click();
      const title = await commentsPage.getTitle();

      // Assert:
      expect(title).toContain(expectedTitle);
    },
  );

  test(
    'Articles button navigates to articles page',
    { tag: '@GAD-R01-03' },
    async ({ articlesPage, commentsPage }) => {
      // Arrange:
      const expectedTitle = 'Articles';

      // Act:
      await commentsPage.mainMenuComponent.articlesButton.click();
      const title = await articlesPage.getTitle();

      // Assert:
      expect(title).toContain(expectedTitle);
    },
  );

  test(
    'Home page button navigates to main page',
    { tag: '@GAD-R01-03' },
    async ({ page, articlesPage }) => {
      // Arrange:
      const homePage = new HomePage(page);
      const expectedTitle = 'GAD';

      // Act:
      await articlesPage.mainMenuComponent.clickHomePageLink();
      const title = await homePage.getTitle();

      // Assert:
      expect(title).toContain(expectedTitle);
    },
  );
});
