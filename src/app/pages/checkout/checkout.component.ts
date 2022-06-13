import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/core/models/user';
import { LocalAuthService } from 'src/app/core/services/helpers/local-auth.service';

@Component({
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  mainPageTitle = 'Checkout'
  pageTitle = ''
  user: UserModel;
  isGuestCheckout = false;
  
  constructor(
    private localAuth: LocalAuthService
  ) { this.user = this.localAuth.userObj }

  ngOnInit(): void {
    if (!this.user && !this.user.auth_token) {
      this.isGuestCheckout = true;
    }
  }


}
