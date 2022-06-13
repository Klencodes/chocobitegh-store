import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  repeatOrder(){

  }
  viewOrderDetails(order){
    console.log(order)
    this.router.navigate(['/account/orders/order-details', order])
  }
}
