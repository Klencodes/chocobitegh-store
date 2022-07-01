import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ResponseStatus, UserType } from 'src/app/core/enums/enums';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';
import { MustMatch } from 'src/app/core/validators/must-match';
import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component';
import { ValidateOtpComponent } from '../validate-otp/validate-otp.component';

@Component({
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isProcessing: boolean;
  hidePassword = true;
  btnText = 'Sign Up';
  submitted = false;
  returnUrl: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      phone_number: new FormControl('', [Validators.required]),
      // gender: new FormControl('Female', [Validators.required]),
      user_type: new FormControl(UserType.CUSTOMER, [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirm_password: new FormControl('', Validators.required),
    }, { validator: MustMatch('password', 'confirm_password') });

  }

  /**
   *Login a user and redirect user to dashboard
   * @param data login credential(email & password)
   */
  onSubmit(data) {
    if (this.signupForm.invalid) {
      this.submitted = true;
      this.signupForm.markAllAsTouched()
      this.toast.error('Please enter all required fields')
      return;
    }
    // if(this.accept_terms.value == false){
    //   this.toast.error('Accept terms and conditions to create your account', 'Sign Up error')
    //   return;
    // }
    this.isProcessing = true;
    this.authService.sendOtp({ phone_number: data.phone_number }, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.dialog.open(ValidateOtpComponent, { data: { formData: data, isNew: true }, disableClose: true })
      }
    });

  }

  openTermsCondition() {
    this.dialog.open(TermsConditionsComponent)
  }

  get first_name() { return this.signupForm.get('first_name') }
  get last_name() { return this.signupForm.get('last_name') }
  get phone_number() { return this.signupForm.get('phone_number') }
  // get gender() { return this.signupForm.get('gender') }
  // get accept_terms() { return this.signupForm.get('accept_terms') }
  get password() { return this.signupForm.get('password') }
  get confirm_password() { return this.signupForm.get('confirm_password') }
}
