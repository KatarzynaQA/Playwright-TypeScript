import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify user login to account', () => {
  test('User can login with correct credentials', { tag: '@GAD-R02 @S02' }, async ({ page }) => {
    // Arrange:
    const userName = 'Moses.Armstrong@Feest.ca';
    const userPassword = 'test1';
    const loginPage = new LoginPage(page);

    // Act:
    await loginPage.goto();
    await loginPage.loginUser(userName, userPassword);

    const welcomePage = new WelcomePage(page);
    const welcomeTitle = await welcomePage.getTitle();

    // Assert:
    expect(welcomeTitle).toContain('Welcome');
  });
});
