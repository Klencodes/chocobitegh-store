import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toast: ToastrService,
    private dialogRef: MatDialogRef<GuestCustomerConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }



  ngOnInit() {
    if(this.data.isReviewData){
      this.canLogin = true;
    }
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
    this.authService.signIn(data, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        if(this.data?.isReviewData){ 
          localStorage.setItem('cb_user', JSON.stringify(result.results));
          this.dialogRef.close(true)
          this.toast.success('Login was successful')
        }else{
          window.location.href = '/checkout'
        }
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
