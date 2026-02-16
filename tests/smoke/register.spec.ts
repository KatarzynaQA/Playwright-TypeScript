import { RegisterUser } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Verify register', { tag: '@GAD-R03 @S03' }, () => {
  test(
    'User can register to the service using required fields',
    { tag: '@GAD-R03-01, @GAD-R03-02, @GAD-R03-03' },
    async ({ page }) => {
      // Arrange:
      const alertPopupText = 'User created';

      const registerUserData: RegisterUser = {
        userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
        userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
        userEmail: '',
        password: faker.internet.password(),
      };

      registerUserData.userEmail = faker.internet.email({
        firstName: registerUserData.userFirstName,
      });

      const registerPage = new RegisterPage(page);

      // Act:
      await registerPage.goto();
      await registerPage.registerUser(registerUserData);
      await expect(registerPage.registerPageComponent.alertPopup).toHaveText(alertPopupText);

      // Assert:
      const loginPage = new LoginPage(page);
      await loginPage.waitForPageLoadUrl();

      const title = await loginPage.getTitle();
      expect(title).toContain('Login');

      //Assert
      await loginPage.loginUser(registerUserData.userEmail, registerUserData.password);

      const welcomePage = new WelcomePage(page);
      const welcomeTitle = await welcomePage.getTitle();
      expect(welcomeTitle).toContain('Welcome');
    },
  );
});
