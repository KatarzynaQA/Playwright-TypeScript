import { LoginFormComponent } from '../components/login-form.component';
import { UserLogin } from '../models/userLogin.model';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';
  loginFormComponent = new LoginFormComponent(this.page);
  errorLoginMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.errorLoginMessage = this.page.getByTestId('login-error');
  }

  async incorrectLoginUser(userName: string, userPassword: string): Promise<void> {
    await this.loginFormComponent.loginInput.fill(userName);
    await this.loginFormComponent.passwordInput.fill(userPassword);
    await this.loginFormComponent.logInButton.click();
  }

  async loginUser(userLoginData: UserLogin): Promise<void> {
    await this.loginFormComponent.loginInput.fill(userLoginData.userName);
    await this.loginFormComponent.passwordInput.fill(userLoginData.userPassword);
    await this.loginFormComponent.logInButton.click();
  }
}
