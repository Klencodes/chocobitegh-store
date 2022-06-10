import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';
import { LocalAuthService } from 'src/app/core/services/helpers/local-auth.service';

@Component({
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  isProcessing = false;
  hidePassword = true;
  btnText = 'Sign In';
  submitted = false;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private localAuth: LocalAuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      phone_number: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      // news_letter: new FormControl(false, [Validators.required]),
    })

    if (this.localAuth.isLogedIn) {
      // this.router.navigate(['/dashboard']);
    }
  }

  /**
   *Login a user and redirect user to dashboard
   * @param data signin credential(email & password)
   */
  onSubmit(data) {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }
    this.isProcessing = true;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.authService.signIn(data, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.localAuth.increaseLoggedInCount();
        this.router.navigateByUrl(returnUrl);
      } else {
        // get return url from query parameters or default to home page
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/auth/signin';
        this.router.navigateByUrl(returnUrl);
      }

    });
  }

  get phone_number() { return this.signinForm.get('phone_number') }
  get password() { return this.signinForm.get('password') }
  // get news_letter() { return this.signinForm.get('news_letter') }

}
