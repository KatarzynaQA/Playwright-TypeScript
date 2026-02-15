import { RegisterPageComponent } from '../components/registerPage.component';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';
  registerPageComponent = new RegisterPageComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async registerUser(
    userFirstName: string,
    userLastName: string,
    userEmail: string,
    password: string,
  ): Promise<void> {
    await this.registerPageComponent.userFirstNameInput.fill(userFirstName);
    await this.registerPageComponent.userLastNameInput.fill(userLastName);
    await this.registerPageComponent.userEmailInput.fill(userEmail);
    await this.registerPageComponent.passwordInput.fill(password);
    await this.registerPageComponent.registerButton.click();
  }
}
