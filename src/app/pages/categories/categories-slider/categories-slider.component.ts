import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-slider',
  templateUrl: './categories-slider.component.html',
})
export class CategoriesSliderComponent implements OnInit {
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
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev'
    // },
    breakpoints: {
      1240: {
        slidesPerView: 10,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 8,
        spaceBetween: 20
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
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
 * View Category details
 * @param category 
 */
  viewCatDetails(category) {
    this.router.navigate(['/categories/category-details', 'category name extra', 5520])
    // this.router.navigate(['/categories/category-details', category.name, category.id])
  }
}
