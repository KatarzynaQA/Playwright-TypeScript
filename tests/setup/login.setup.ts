import { STORAGE_STATE } from '../../playwright.config';
import { expect, test as setup } from '../../src/fixtures/merge.fixture';
import { userData } from '../../src/test-data/user.data';

setup('User can login with correct credentials', async ({ welcomePage, loginPage, page }) => {
  // Arrange:
  const expectedPageTitle = 'Welcome';

  // Act:
  await loginPage.loginUser(userData);

  const welcomeTitle = await welcomePage.getTitle();

  // Assert:
  expect(welcomeTitle).toContain(expectedPageTitle);
  //   await page.context().storageState({ path: 'session.json' });
  await page.context().storageState({ path: STORAGE_STATE });
});
