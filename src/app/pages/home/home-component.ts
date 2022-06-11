import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import SwiperCore, { Autoplay, Pagination, Navigation, } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(
        private router: Router
    ) { }

    ngOnInit() { }

    /**
     * View product details
     * @param product 
     */
    productDetails(product){
        this.router.navigate(['/product-details', 'New Orange Flavor', 555454])
        // this.router.navigate(['/product-details', product.name, product.id])
    }
}