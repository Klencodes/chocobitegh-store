import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent implements OnInit {
  mainPageTitle = 'Products'
  pageTitle = 'Product Details'
  thumbsSwiper: any;
  tags = ['sweet', 'CHOCO', 'Tasty']
  imgs = [
    'assets/images/items/detail1/big.jpg',
    'assets/images/items/detail1/big1.jpg',
    'assets/images/items/detail1/big2.jpg',
    'assets/images/items/detail1/big3.jpg',
    'assets/images/items/detail1/big4.jpg'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
