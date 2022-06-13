import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalAuthService } from 'src/app/core/services/helpers/local-auth.service';
import { GuestCustomerConfirmationComponent } from '../guest-customer-confirmation/guest-customer-confirmation.component';

@Component({
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  user;
  breadCrumbItems: Array<{}>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private localAuth: LocalAuthService
  ) { this.user = this.localAuth.userObj }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Cart', active: true }];
  }

  checkout() {
    if (!this.user && !this.user.auth_token) {
      this.dialog.open(GuestCustomerConfirmationComponent)
    } else {
      this.router.navigate(['/checkout'])
    }
  }
}
