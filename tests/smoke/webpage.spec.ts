import { expect, test } from '../../src/fixtures/merge.fixture';

test.describe('Test', () => {
  test('Home page title contains sentence "GAD"', { tag: '@GAD-R01-01' }, async ({ homePage }) => {
    //Arrange
    //Act
    // await homePage.goto();

    //Assert
    const title = await homePage.getTitle();
    expect(title).toContain('GAD');
  });

  test(
    'User can access without logging in to Articles and Comments pages',
    { tag: '@GAD-R01-02' },
    async ({ articlesPage }) => {
      //Arrange
      //Act
      //Assert
      const title = await articlesPage.getTitle();
      expect(title).toContain('Articles');
    },
  );

  test(
    'User can access without logging in to Comments pages',
    { tag: '@GAD-R01-02' },
    async ({ commentsPage }) => {
      //Arrange
      //Act
      //Assert
      const title = await commentsPage.getTitle();
      expect(title).toContain('Comments');
    },
  );
});
