import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent, data: { title: 'Sign Up'} },
  { path: 'signin', component: SigninComponent, data: { title: 'Sign In'} },
  { path: 'forgot-password', component: ForgotPassComponent, data: { title: 'Forgot Password'} },
  { path: 'create-password', component: CreatePasswordComponent, data: { title: 'Create Password'} },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
