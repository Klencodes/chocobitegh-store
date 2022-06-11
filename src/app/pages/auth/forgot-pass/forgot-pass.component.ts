import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';
import { ValidateOtpComponent } from '../validate-otp/validate-otp.component';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
})
export class ForgotPassComponent implements OnInit {
  phoneCtrl: FormControl = new FormControl('', [Validators.required]);
  isProcessing = false;
  btnText = 'Submit';

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  /**
   *Request password reset via phone number
   * @param phone_number to submit to server
   */
  onSubmit() {
    if(this.phoneCtrl.invalid){
      this.phoneCtrl.markAllAsTouched();
      return;
    }
    const data = { phone_number: this.phoneCtrl.value, }
    this.isProcessing = true;
    this.authService.requestPasswordResetOtp(data, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.dialog.open(ValidateOtpComponent, { data: { formData: data, isNew: false }, disableClose: true })
      }
    });
  }

}
