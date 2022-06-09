import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
})
export class ForgotPassComponent implements OnInit {
  emailCtrl: FormControl = new FormControl('', [Validators.required, Validators.email] );
  isProcessing = false;
  btnText = 'Submit';

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() { 
  }
  
  /**
   *Request password reset via email
   * @param email email to submit to server
   */
   onSubmit() {
    this.isProcessing = true;
    this.authService.forgetPassword({email: this.emailCtrl.value}, (error, result) => {
      this.isProcessing = false;
    });
  }

}
