import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';

@Component({
  templateUrl: './guest-customer-confirmation.component.html',
})
export class GuestCustomerConfirmationComponent implements OnInit {
  canLogin = false;
  signinForm: FormGroup;
  isProcessing = false;
  hidePassword = true;
  btnText = 'Sign In';
  returnUrl: string;
  
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<GuestCustomerConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }



  ngOnInit() {
    this.signinForm = new FormGroup({
      phone_number: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      // news_letter: new FormControl(false, [Validators.required]),
    })
  }

  /**
   *Login a user and redirect user to dashboard
   * @param data signin credential(email & password)
   */
  onSubmit(data) {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched()
      return;
    }
    this.isProcessing = true;
    // const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.authService.signIn(data, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        // this.router.navigateByUrl(returnUrl);
        window.location.href = '/checkout'
      } 
    });
  }

  closeDialog(){
    this.dialogRef.close(true)
  }
  
  onLoginClicked(){
    this.canLogin = true;
  }

  get phone_number() { return this.signinForm.get('phone_number') }
  get password() { return this.signinForm.get('password') }

}
