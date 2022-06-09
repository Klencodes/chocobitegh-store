import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { CreatePasswordComponent } from '../auth/create-password/create-password.component';
import { SharedDirectivesModule } from 'src/app/core/directives/shared-directives-module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


@NgModule({
  declarations: [
    SigninComponent,
    ForgotPassComponent,
    CreatePasswordComponent,
    SignupComponent,
    TermsConditionsComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedDirectivesModule,
    MaterialModule,
    PerfectScrollbarModule
  ]
})
export class AuthModule { }
