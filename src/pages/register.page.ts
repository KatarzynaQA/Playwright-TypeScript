import { RegisterPageComponent } from '../components/registerPage.component';
import { RegisterUser } from '../models/user.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';
  registerPageComponent = new RegisterPageComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async registerUser(registerUserData: RegisterUser): Promise<void> {
    await this.registerPageComponent.userFirstNameInput.fill(registerUserData.userFirstName);
    await this.registerPageComponent.userLastNameInput.fill(registerUserData.userLastName);
    await this.registerPageComponent.userEmailInput.fill(registerUserData.userEmail);
    await this.registerPageComponent.passwordInput.fill(registerUserData.password);
    await this.registerPageComponent.registerButton.click();
  }
}
