import { expect, test } from '@_src/ui/fixtures/merge.fixture';
import { apiLinks } from '@_src/ui/utils/api.utils';

test.describe('Verify articles API endpoint', () => {
  test(
    'GET articles returns status code 200',
    { tag: '@GAD-R08-01, @smoke' },
    async ({ request }) => {
      // Arrange:
      const expectedStatusCode = 200;

      // Act:
      const response = await request.get(apiLinks.articlesUrl);

      // Assert:
      expect(response.status()).toBe(expectedStatusCode);
    },
  );

  test(
    'GET articles should returns at least one article',
    { tag: '@GAD-R08-01, @smoke, @predefine_data' },
    async ({ request }) => {
      // Arrange:
      const expectedArticleCount = 1;

      // Act:

      const response = await request.get(apiLinks.articlesUrl);
      const responseJSON = await response.json();

      // Assert:
      expect(responseJSON.length).toBeGreaterThanOrEqual(expectedArticleCount);
    },
  );

  test(
    'GET articles returns article object',
    { tag: '@GAD-R08-01, @smoke, @predefine_data' },
    async ({ request }) => {
      // Arrange:
      const expectedRequiredProperties = ['id', 'user_id', 'title', 'body', 'date', 'image'];

      // Act:

      const response = await request.get(apiLinks.articlesUrl);
      const responseJSON = await response.json();
      const article = responseJSON[0];

      // Assert:
      expect(article).toHaveProperty('id');

      expectedRequiredProperties.forEach((property) => {
        expect(article, `Article object has required property: "${property}"`).toHaveProperty(
          property,
        );
      });
    },
  );
});
