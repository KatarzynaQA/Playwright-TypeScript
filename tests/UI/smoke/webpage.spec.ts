import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Test', () => {
  test('Home page title contains sentence "GAD"', { tag: '@GAD-R01-01' }, async ({ homePage }) => {
    //Arrange
    const expectedHomePageTitle = 'GAD';
    //Act
    //Assert
    const title = await homePage.getTitle();
    expect(title).toContain(expectedHomePageTitle);
  });

  test(
    'User can access without logging in to Articles and Comments pages',
    { tag: '@GAD-R01-02' },
    async ({ articlesPage }) => {
      //Arrange
      const expectedPageTitle = 'Articles';

      //Act
      //Assert
      const title = await articlesPage.getTitle();
      expect(title).toContain(expectedPageTitle);
    },
  );

  test(
    'User can access without logging in to Comments pages',
    { tag: '@GAD-R01-02' },
    async ({ commentsPage }) => {
      //Arrange
      const expectedPageTitle = 'Comments';

      //Act
      //Assert
      const title = await commentsPage.getTitle();
      expect(title).toContain(expectedPageTitle);
    },
  );
});
