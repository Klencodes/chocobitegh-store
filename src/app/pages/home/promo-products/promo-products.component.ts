import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/api-calls/product.service';

@Component({
  selector: 'app-promo-products',
  templateUrl: './promo-products.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PromoProductsComponent implements OnInit {
  swiperConfig: any = {
    Autoplay: false,
    // loop: true,
    autoHeight: true,
    allowTouchMove: true,
    autoplay: false,
    // pagination: { dynamicBullets: true },
    // pagination: { el: '.swiper-pagination', clickable: true },
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev'
    // },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 5
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 5
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 5
      },
      420: {
        slidesPerView: 1,
        spaceBetween: 5
      }
    },
  }
  isProcessing: boolean;
  page = 1;
  listArrayOfProducts: ProductModel[] = [];
  displayedList: ProductModel[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchProducts()

  }
  /**
      * Fetch products
      */
  fetchProducts() {
    this.isProcessing = true;
    this.productService.fetchProducts(this.page, (error, result) => {
      if (result !== null) {
        this.listArrayOfProducts = result.results;
        this.displayedList = [...this.listArrayOfProducts];
      }
    })
  }
  /**
  * View product details
  * @param product 
  */
  productDetails(product) {
    this.router.navigate(['/product-details', product.name, product.id])
  }


}
