import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Account Information', active: true }];

  }

  account() {
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Account Information', active: true }];
    this.router.navigate(['/account'])
  }
  order() {
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'My Orders', active: true }];
    this.router.navigate(['/account/orders'])
  }
  wishlist() {
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'My Favorites', active: true }];
    this.router.navigate(['/account/favorites'])
  }
  transaction() {
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'My Transactions', active: true }];
    this.router.navigate(['/account/transactions'])
  }
  logout() {

  }
}