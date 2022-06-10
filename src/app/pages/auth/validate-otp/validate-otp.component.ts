import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';

@Component({
  templateUrl: './validate-otp.component.html',
})
export class ValidateOtpComponent implements OnInit {
  otpCtrl: FormControl = new FormControl('', [Validators.required])
  isVerifying: boolean;
  btnText = 'Verify';
  configData: { suppressScrollX: boolean; wheelSpeed: number; };
  otp: number;
  config = {
    allowNumbersOnly: true, length: 6, disableAutoFocus: false, placeholder: '_',
    inputStyles: { 'width': '40px', 'height': '50px' }
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<ValidateOtpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.configData = { suppressScrollX: true, wheelSpeed: 0.3 };
    console.log(this.data)
  }

  onOtpChange(otpValue) {
    if (otpValue?.length === 6) {
      if (this.data.isNew) {
        this.isVerifying = true;
        this.authService.validateOtp({ phone_number: this.data.formData.phone_number, otp: otpValue }, (error, result) => {
          this.isVerifying = false;
          if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
            this.dialogRef.close(true);
            this.authService.signUp(this.data.formData, (error, result) => {
              if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
                this.router.navigate(['/auth/signin']);
              }
            })
          }
        })
      } else {
        this.isVerifying = true;
        this.authService.validatePasswordResetOtp({ phone_number: this.data.formData.phone_number, otp: otpValue }, (error, result) => {
          this.isVerifying = false;
          if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
            this.dialogRef.close(true);
            this.router.navigate(['/auth/create-password']);
          }
        })
      }
    }
  }

  closeDialog() {
    this.dialogRef.close(true)
  }
}
