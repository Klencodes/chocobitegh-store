import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';
import { MustMatch } from 'src/app/core/validators/must-match';
import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component';

@Component({
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isProcessing = false;
  hidePassword = true;
  btnText = 'Signup';
  submitted = false;
  returnUrl: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      phone_number: new FormControl(''),
      accept_terms: new FormControl(true, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm_password: new FormControl('', Validators.required),
    }, { validator: MustMatch('password', 'confirm_password') });

  }

  /**
   *Login a user and redirect user to dashboard
   * @param data login credential(email & password)
   */
  onSubmit(data) {
    this.submitted = true;
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched()
      return;
    }
    if(this.accept_terms.value == false){
      this.toast.error('Accept terms and conditions to create your account', 'Sign Up error')
      return;
    }
    this.isProcessing = true;
    this.authService.signUp(data, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        // this.router.navigate(['/auth/signin'])
      }
    });
  }
  /**
   * Signin with google account
  */
  signinWithGoogle() {

  }

  openTermsCondition(){
    this.dialog.open(TermsConditionsComponent)
  }

  get first_name() { return this.signupForm.get('first_name') }
  get last_name() { return this.signupForm.get('last_name') }
  get email() { return this.signupForm.get('email') }
  get phone_number() { return this.signupForm.get('phone_number') }
  get accept_terms() { return this.signupForm.get('accept_terms') }
  get password() { return this.signupForm.get('password') }
  get confirm_password() { return this.signupForm.get('confirm_password') }
}
