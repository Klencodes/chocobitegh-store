import { Component, OnInit } from '@angular/core';

import SwiperCore, { Autoplay, Pagination, Navigation, } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit() { }
}