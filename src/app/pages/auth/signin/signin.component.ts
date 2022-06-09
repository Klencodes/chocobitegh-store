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
  loginForm: FormGroup;
  isProcessing = false;
  hidePassword = true;
  btnText = 'login';
  submitted = false;
  returnUrl: any;

  constructor(
    private authService: AuthService,
    private localAuth: LocalAuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      // news_letter: new FormControl(false, [Validators.required]),
    })

    if (this.localAuth.isLogedIn) {
      // this.router.navigate(['/dashboard']);
    }
  }

  /**
   *Login a user and redirect user to dashboard
   * @param data login credential(email & password)
   */
  onSubmit(data) {
    this.submitted = true;
    if (this.loginForm.invalid) {
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
  /**
   * Singin with google account
   */
  signinWithGoogle(){

  }
  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
  // get news_letter() { return this.loginForm.get('news_letter') }

}
