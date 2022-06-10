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
  thumbsSwiper: any;

  imgs = [
    'assets/images/items/detail1/big.jpg',
    'assets/images/items/detail1/big.jpg',
    'assets/images/items/detail1/big.jpg',
    'assets/images/items/detail1/big.jpg',
    'assets/images/items/detail1/big.jpg'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
