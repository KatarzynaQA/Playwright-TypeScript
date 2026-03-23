import { prepareRandomUserData } from '@_src/factories/user.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify register', { tag: '@GAD-R03 @S03' }, () => {
  test(
    'User can register to the service using required fields',
    { tag: '@GAD-R03-01, @GAD-R03-02, @GAD-R03-03' },
    async ({ loginPage, welcomePage, registerPage }) => {
      // Arrange:
      const expectPopupText = 'User created';
      const expectedLoginPageTitle = 'Login';
      const expectedWelcomePageTitle = 'Welcome';

      const registerUserData = prepareRandomUserData();

      // Act:
      await registerPage.goto();
      await registerPage.registerUser(registerUserData);
      await expect(registerPage.registerPageComponent.alertPopup).toHaveText(expectPopupText);

      // Assert:
      await loginPage.waitForPageLoadUrl();

      const title = await loginPage.getTitle();
      expect(title).toContain(expectedLoginPageTitle);

      //Assert
      await loginPage.loginUser({
        userName: registerUserData.userEmail,
        userPassword: registerUserData.password,
      });

      const welcomeTitle = await welcomePage.getTitle();
      expect(welcomeTitle).toContain(expectedWelcomePageTitle);
    },
  );
});
