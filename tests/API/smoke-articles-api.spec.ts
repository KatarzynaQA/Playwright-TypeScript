import { expect, test } from '@_src/merge.fixture';

test.describe('Verify articles API endpoint', () => {
  test(
    'GET articles returns status code 200',
    { tag: '@GAD-R08-01, @smoke' },
    async ({ articlesRequest }) => {
      // Arrange:
      const expectedStatusCode = 200;

      // Act:
      // const response = await request.get(apiUrl.articlesUrl);
      const response = await articlesRequest.get();

      // Assert:
      expect(response.status()).toBe(expectedStatusCode);
    },
  );

  test(
    'GET articles should returns at least one article',
    { tag: '@GAD-R08-01, @smoke, @predefine_data' },
    async ({ articlesRequest }) => {
      // Arrange:
      const expectedArticleCount = 1;

      // Act:

      const response = await articlesRequest.get();
      const responseJSON = await response.json();

      // Assert:
      expect(responseJSON.length).toBeGreaterThanOrEqual(expectedArticleCount);
    },
  );

  test(
    'GET articles returns article object',
    { tag: '@GAD-R08-01, @smoke, @predefine_data' },
    async ({ articlesRequest }) => {
      // Arrange:
      const expectedRequiredProperties = ['id', 'user_id', 'title', 'body', 'date', 'image'];

      // Act:

      const response = await articlesRequest.get();
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
