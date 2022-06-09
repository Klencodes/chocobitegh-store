import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'src/app/core/validators/must-match';
import { ToastrService } from 'ngx-toastr';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html'
})
export class CreatePasswordComponent implements OnInit {
  btnText = 'Save Password';
  formData: FormGroup;
  formDataNew: FormGroup;
  isProcessing = false;
  hidePassword = true;
  submitted = false;
  tokenOld = '';
  emailOld = '';
  tokenNew = '';
  emailNew = '';
  pageTitle = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {

    this.formDataNew = this.formBuilder.group({
      email_verification_string: [''],
      email: [''],
      password: ['', Validators.required, Validators.minLength(8)],
      confirm_password: ['', Validators.required],
    }, { validator: MustMatch('password', 'confirm_password') });

    this.formData = this.formBuilder.group({
      reset_password_string: [''],
      email: [''],
      new_password: ['', Validators.required, Validators.minLength(8)],
      confirm_new_password: ['', Validators.required],
    }, { validator: MustMatch('new_password', 'confirm_new_password') });

    this.tokenNew = this.route.snapshot.queryParams['string']
    this.emailNew = this.route.snapshot.queryParams['email']
    this.tokenOld = this.route.snapshot.queryParams['str']
    this.emailOld = this.route.snapshot.queryParams['em']

    if (this.tokenOld !== null && this.tokenOld !== undefined && this.tokenOld !== '' && this.emailOld !== '') {
      this.formData.get('reset_password_string').setValue(this.tokenOld);
      this.formData.get('email').setValue(this.emailOld);
      this.pageTitle = 'Reset Password';
    } else {
      this.formDataNew.get('email_verification_string').setValue(this.tokenNew)
      this.formDataNew.get('email').setValue(this.emailNew)
      this.pageTitle = 'Create Password';
    }
  }

  onSubmit(data) {
    if (this.tokenOld !== null && this.tokenOld !== undefined && this.tokenOld !== '' && this.emailOld !== '') {
      this.isProcessing = true;
      if (this.formData.invalid) {
        this.formData.markAllAsTouched();
        return;
      }
      this.authService.resetPassword(data, (error, result) => {
        this.isProcessing = false;
        if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
          setTimeout(() => {
            this.router.navigate(['/auth/signin'],)
          }, 2500);
        }
      })
    }else{
      if (this.formDataNew.invalid) {
        this.formDataNew.markAllAsTouched();
        return;
      }
      this.isProcessing = true;
      this.authService.createNewPassword(data, (error, result) => {
        this.isProcessing = false;
        if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
          setTimeout(() => {
            this.router.navigate(['/auth/signin'],)
          }, 2500);
        }
      })
    }
    
  }


  // convenience getter for easy access to form fields
  get f() { return this.formData.controls; }

}
