import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Orders', link: '/account/orders' }, { label: 'Account Information', active: true }];

  }

}
