import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule , HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'], // Use styleUrls here (plural)
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  constructor(private _location: Location,private _authService:AuthenticationServiceService, private router: Router) {
    this.signupForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.signupForm.setValidators(this.passwordMatchValidator);
  }

  // Password match validator
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Handle form submission
  handleSignup() {
    this.loading=true;
    if (this.signupForm.valid) {
      console.log('Form Data:', this.signupForm.value);
      this._authService.sendOtp(this.signupForm.value).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/verify']);
          this.loading = false;
        },
        (error) => {
          console.error('Signup failed', error);
          this.loading = false;
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }


  goBackToPreviosPage() {
    this._location.back();
  }

}
