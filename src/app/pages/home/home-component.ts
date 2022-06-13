import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import SwiperCore, { Autoplay, Pagination, Navigation, Swiper, } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    swiperConfig: any = {
        slidesPerView: 2,
        spaceBetween: 20,
        Autoplay: true,
        // loop: true,
        autoHeight: true,
        allowTouchMove: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: true
        },
        // pagination: { el: '.swiper-pagination', clickable: true },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            1024: {
                slidesPerView: 8,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 6,
                spaceBetween: 10
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 3,
                spaceBetween: 10
            }
        },
    }
    constructor(
        private router: Router
    ) { }

    ngOnInit() {

    }

    /**
     * View Category details
     * @param category 
     */
     viewCatDetails(category) {
        console.log(category)
        this.router.navigate(['/category-details', category])
     }
    /**
     * View product details
     * @param product 
     */
    productDetails(product) {
        this.router.navigate(['/product-details', 'New Orange Flavor', 555454])
        // this.router.navigate(['/product-details', product.name, product.id])
    }
}