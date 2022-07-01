import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/api-calls/cart.service';
import { ProductService } from 'src/app/core/services/api-calls/product.service';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  // encapsulation: ViewEncapsulation.None,
})
export class RelatedProductsComponent implements OnInit {
  @Input () productId;

  swiperConfig: any = {
    slidesPerView: 2,
    spaceBetween: 10,
    Autoplay: true,
    autoHeight: false,
    allowTouchMove: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true
    },
    breakpoints: {
 
      // 1584: {
      //   slidesPerView: 6,
      //   spaceBetween: 20
      // },
      1284: {
        slidesPerView: 5,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 10
      }
    },
  }
  relatedProducts: ProductModel[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService:  CartService,
  ) { }

  ngOnInit(): void {
      this.productService.fetchRelatedProducts({product_id: this.productId}, (error, result) => {
        if (result !== null) {
          this.relatedProducts = result.results;
        }
      })
  }

    /**
     * View product details
     * @param product 
     */
     viewProductDetails(product) {
      this.router.navigate(['/product-details', product.name, product.id])
    }
   /**
     * Add to cart
     */
    addToCart(id) {
      this.cartService.addProductToCart(id)
    }
}
