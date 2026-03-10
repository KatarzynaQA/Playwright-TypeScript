import { BasePage } from './base.page';
import { RegisterPageComponent } from '@_src/components/registerPage.component';
import { Page } from '@playwright/test';
import { RegisterUserModel } from '@src/models/user.model';

export class RegisterPage extends BasePage {
  url = '/register.html';
  registerPageComponent = new RegisterPageComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async registerUser(registerUserData: RegisterUserModel): Promise<void> {
    await this.registerPageComponent.userFirstNameInput.fill(registerUserData.userFirstName);
    await this.registerPageComponent.userLastNameInput.fill(registerUserData.userLastName);
    await this.registerPageComponent.userEmailInput.fill(registerUserData.userEmail);
    await this.registerPageComponent.passwordInput.fill(registerUserData.password);
    await this.registerPageComponent.registerButton.click();
  }
}
