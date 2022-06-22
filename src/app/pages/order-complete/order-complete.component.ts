import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './order-complete.component.html'
})
export class OrderCompleteComponent implements OnInit {

  orderCode: string;
  pickupDateTime: string;

  constructor(
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation()
    const state = navigation.extras.state as {
      order_code: string;
    };
    this.orderCode = state.order_code;
  }

 ngOnInit(): void {
   
 }
}
