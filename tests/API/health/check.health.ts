import { expect, test as healthCheck } from '@_src/merge.fixture';

healthCheck('verify if application is in correct state', async ({ request }) => {
  // Arrange:
  const expectedStatus = 'OK';

  // Act:
  const response = await request.get('/api/health');
  const responseJson = await response.json();

  // Assert:
  expect(responseJson.status).toBe(expectedStatus);
});
