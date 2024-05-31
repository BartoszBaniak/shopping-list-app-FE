import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from '../../models/login-data';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const data = this.loginForm.value;

    this.loginService.login(data).subscribe(
      (response) => {
        console.log("Login successful:", response);
      },
      (error) => {
        console.error("Login failed:", error);
      }
    );
  }
}
