import { BasePage } from './base.page';
import { LoginFormComponent } from '@_src/components/login-form.component';
import { Locator, Page } from '@playwright/test';
import { UserLoginModel } from '@src/models/userLogin.model';

export class LoginPage extends BasePage {
  url = '/login/';
  loginFormComponent = new LoginFormComponent(this.page);
  errorLoginMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.errorLoginMessage = this.page.getByTestId('login-error');
  }

  async loginUser(userLoginData: UserLoginModel): Promise<void> {
    await this.loginFormComponent.loginInput.fill(userLoginData.userName);
    await this.loginFormComponent.passwordInput.fill(userLoginData.userPassword);
    await this.loginFormComponent.logInButton.click();
  }
}
