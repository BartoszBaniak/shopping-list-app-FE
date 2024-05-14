import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { RegisterData } from '../../models/register-data';

export const StrongPasswordRegx: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,32}$/;

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  //styleUrl: './register-page.component.css',
  encapsulation: ViewEncapsulation.None,
})

export class RegisterPageComponent {
  registerForm: FormGroup ;
  private registerService = inject(RegisterService);

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.pattern(StrongPasswordRegx)]],
    } as unknown as RegisterData);
  }

  get passwordFormField(){
    return this.registerForm.get('password');
  }
  get emailFormField(){
    return this.registerForm.controls['email'];
  }

  sendRegisterData() {
    const data = this.registerForm.value;
    {
      console.log('Data sent');
      this.registerService.postRegisterData(data).subscribe(
        (response) => {
          console.log('Data sent successfully:', response);
        },
        (error) => {
          console.error('Error sending data:', error);
        }
      );
    }
  }
      
  }
