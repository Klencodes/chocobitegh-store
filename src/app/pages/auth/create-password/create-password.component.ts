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
  pageTitle = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      otp: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(6)],
      confirm_password: ['', Validators.required],
    }, { validator: MustMatch('password', 'confirm_password') });

  }

  onSubmit(data) {
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
    }
    

}
