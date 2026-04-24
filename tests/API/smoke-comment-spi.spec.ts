import { expect, test } from '@_src/merge.fixture';

test.describe('Verify comment API endpoint', () => {
  test(
    'GET comments returns status code 200',
    { tag: '@GAD-R08-02, @api' },
    async ({ commentsRequest }) => {
      // Arrange:
      const expectedStatusCode = 200;

      // Act:
      const response = await commentsRequest.get();

      // Assert:
      expect(response.status()).toBe(expectedStatusCode);
    },
  );

  test(
    'GET comments should return at least one object',
    { tag: '@GAD-R08-02, @api' },
    async ({ commentsRequest }) => {
      //Arrange
      const expectedObjectCount = 1;

      //Act
      const response = await commentsRequest.get();
      const responseJson = await response.json();

      //Assert
      expect(responseJson.length).toBeGreaterThanOrEqual(expectedObjectCount);
    },
  );

  test(
    'GET comments returns comment object',
    { tag: '@GAD-R08-02, @api, @predefine_data' },
    async ({ commentsRequest }) => {
      // Arrange:
      const expectedRequiredProperties = ['id', 'article_id', 'user_id', 'body', 'date'];

      // Act:

      const response = await commentsRequest.get();
      const responseJSON = await response.json();
      const comment = responseJSON[0];

      // Assert:
      expect(comment).toHaveProperty('id');

      expectedRequiredProperties.forEach((property) => {
        expect(comment, `Comment object has required property: "${property}"`).toHaveProperty(
          property,
        );
      });
    },
  );
});
