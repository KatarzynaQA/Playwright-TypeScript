import { UserLogin } from '../src/models/userLogin.model';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { userData } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify user login to account', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('User can login with correct credentials', { tag: '@GAD-R02 @S02' }, async ({ page }) => {
    // Arrange:
    const welcomePage = new WelcomePage(page);

    // Act:
    await loginPage.goto();
    await loginPage.loginUser(userData);

    const welcomeTitle = await welcomePage.getTitle();

    // Assert:
    expect(welcomeTitle).toContain('Welcome');
  });

  test('User can not login with incorrect credentials', { tag: '@GAD-R02 @S02' }, async () => {
    // Arrange:
    const userLoginData: UserLogin = {
      userName: userData.userName,
      userPassword: 'incorrectPass',
    };

    // Act:
    await loginPage.goto();
    await loginPage.loginUser(userLoginData);

    // Assert:
    const title = await loginPage.getTitle();
    expect.soft(title).toContain('Login');
    await expect.soft(loginPage.errorLoginMessage).toHaveText('Invalid username or password');
  });
});
