import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articles API endpoint', () => {
  let articlesUrl: string;

  test.beforeEach(() => {
    articlesUrl = 'api/articles';
  });

  test(
    'GET articles returns status code 200',
    { tag: '@GAD-R08-01, @api' },
    async ({ request }) => {
      // Arrange:
      const expectedStatusCode = 200;

      // Act:
      const response = await request.get(articlesUrl);

      // Assert:
      expect(response.status()).toBe(expectedStatusCode);
    },
  );

  test(
    'GET articles should returns at least one article',
    { tag: '@GAD-R08-01, @api, @predefine_data' },
    async ({ request }) => {
      // Arrange:
      const expectedArticleCount = 1;

      // Act:

      const response = await request.get(articlesUrl);
      const responseJSON = await response.json();

      // Assert:
      expect(responseJSON.length).toBeGreaterThanOrEqual(expectedArticleCount);
    },
  );
});
