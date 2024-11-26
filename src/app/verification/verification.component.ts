import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent {
  otpForm: FormGroup;
  otp = '';
  error=''
  loading = false;
  constructor(private _location: Location, private _authService :AuthenticationServiceService, private _router: Router) {
    this.otpForm = new FormGroup({
      value01: new FormControl('', [Validators.required, Validators.minLength(1)]),
      value02: new FormControl('', [Validators.required, Validators.minLength(1)]),
      value03: new FormControl('', [Validators.required, Validators.minLength(1)]),
      value04: new FormControl('', [Validators.required, Validators.minLength(1)]),
    })
  }
  

  goBackToPreviosPage(){
    this._location.back();
  }
  onSubmit(){
    console.log("Submitted OTP");
    this.loading = false;
    if (this.otpForm.valid) {
      console.log('Form Data:', this.otpForm.value);
      this.otp = this.otpForm.value.value01 + this.otpForm.value.value02 + this.otpForm.value.value03 + this.otpForm.value.value04
      this._authService.signupUser(this.otp).subscribe((response)=>{
        console.log("Response after otp =>" ,response);
        this.loading = false;
        this._router.navigate(['/success']);
        
      },(error)=>{
        console.log("Error on Otp api =>" , error);
        if (error.status === 401) {
          this.error = "Invalid OTP. Please try again."
        } else {
          console.error("Error on Otp API =>", error);
        }
        this.loading = false;
      })
    }
  }
    
}
