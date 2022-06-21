import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/api-calls/product.service';

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
  categories: CategoryModel[];

  constructor(
    private router: Router,
    private productService: ProductService,

  ) { }

  ngOnInit(): void {
    this.productService.fetchCategories((error, result) => {
      if (result !== null) {
        this.categories = result.results;
      }
    })

  }

  /**
 * View Category details
 * @param category 
 */
  viewCatDetails(category) {
    this.router.navigate(['/categories/category-details', category.name, category.id])
  }
}
