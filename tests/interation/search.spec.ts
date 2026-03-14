import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify search component for articles', () => {
  test(
    'go button should fetch articles',
    { tag: '@GAD-R07-01' },
    async ({ articlesPage, page }) => {
      // Arrange
      const expectedArticlesNumber = 6;

      await expect(articlesPage.goSearchButton).toBeInViewport();
      const responsePromise = page.waitForResponse('/api/articles*');
      // Act
      await articlesPage.clickGoSearchButton();
      const response = await responsePromise;
      const responseBody = await response.json();
      // Assert
      expect(response.ok()).toBeTruthy();
      expect(responseBody).toHaveLength(expectedArticlesNumber);
    },
  );
});
