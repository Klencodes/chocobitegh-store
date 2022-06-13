import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  mainPageTitle = '';
  pageTitle = 'Orders | Order Details';
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  account() {
    this.pageTitle = 'Account Information'
    this.router.navigate(['/account'])
  }
  order() {
    this.pageTitle = 'My Orders'
    this.router.navigate(['/account/orders'])
  }
  wishlist() {
    this.pageTitle = 'My Favorites'
    this.router.navigate(['/account/wishlist'])
  }
  transaction() {
    this.pageTitle = 'Transactions'
    this.router.navigate(['/account/transactions'])
  }
  logout() {

  }
}