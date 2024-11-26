import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,    RouterLink, CommonModule,HttpClientModule,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  error = ''
  constructor(private _authService: AuthenticationServiceService, private _router: Router) {
    this.loginForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Data:', this.loginForm.value);
      
      this._authService.loginUser(this.loginForm.value).subscribe((response) => {
        console.log('Signup successful', response);
        this._router.navigate(['/dashboard/',])
      },
      (error) => {
        console.error('Signup failed', error);
        this.error = error.error.error.message
      })

    } else {
      console.log('Form is invalid');
    }
  }
}
