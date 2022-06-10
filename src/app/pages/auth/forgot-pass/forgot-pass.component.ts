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
  phoneCtrl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  isProcessing = false;
  btnText = 'Submit';

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  /**
   *Request password reset via email
   * @param email email to submit to server
   */
  onSubmit() {
    const data = { phone_number: this.phoneCtrl.value, }
    this.isProcessing = true;
    this.authService.requestPasswordResetOtp({ phone_number: data.phone_number }, (error, result) => {
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.isProcessing = false;
        this.dialog.open(ValidateOtpComponent, { data: { formData: data, isNew: false }, disableClose: true })
      }
    });
  }

}
