import { randomUserData } from '../../src/factories/user.factory';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', { tag: '@GAD-R03 @S03' }, () => {
  test(
    'User can register to the service using required fields',
    { tag: '@GAD-R03-01, @GAD-R03-02, @GAD-R03-03' },
    async ({ page }) => {
      // Arrange:
      const expectPopupText = 'User created';

      const loginPage = new LoginPage(page);
      const welcomePage = new WelcomePage(page);
      const registerPage = new RegisterPage(page);

      const registerUserData = randomUserData();

      // Act:
      await registerPage.goto();
      await registerPage.registerUser(registerUserData);
      await expect(registerPage.registerPageComponent.alertPopup).toHaveText(expectPopupText);

      // Assert:
      await loginPage.waitForPageLoadUrl();

      const title = await loginPage.getTitle();
      expect(title).toContain('Login');

      //Assert
      await loginPage.loginUser({
        userName: registerUserData.userEmail,
        userPassword: registerUserData.password,
      });

      const welcomeTitle = await welcomePage.getTitle();
      expect(welcomeTitle).toContain('Welcome');
    },
  );
});
