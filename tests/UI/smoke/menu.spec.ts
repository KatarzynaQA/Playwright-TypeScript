import { expect, test } from '@_src/ui/fixtures/merge.fixture';

test.describe('Verify main menu button', () => {
  test(
    'Comments button navigates to comments page',
    { tag: '@GAD-R01-03' },
    async ({ articlesPage }) => {
      // Arrange:
      const expectedTitle = 'Comments';

      // Act:
      // await articlesPage.mainMenuComponent.commentsButton.click();
      const commentsPage = await articlesPage.mainMenuComponent.clickCommentsButton();
      const title = await commentsPage.getTitle();

      // Assert:
      expect(title).toContain(expectedTitle);
    },
  );

  test(
    'Articles button navigates to articles page',
    { tag: '@GAD-R01-03' },
    async ({ commentsPage }) => {
      // Arrange:
      const expectedTitle = 'Articles';

      // Act:
      const articlesPage = await commentsPage.mainMenuComponent.clickArticlesButton();
      const title = await articlesPage.getTitle();

      // Assert:
      expect(title).toContain(expectedTitle);
    },
  );

  test(
    'Home page button navigates to main page',
    { tag: '@GAD-R01-03' },
    async ({ articlesPage }) => {
      // Arrange:
      const expectedTitle = 'GAD';

      // Act:
      const homePage = await articlesPage.mainMenuComponent.clickHomePageLink();
      const title = await homePage.getTitle();

      // Assert:
      expect(title).toContain(expectedTitle);
    },
  );
});
