import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { ProductModel } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/api-calls/cart.service';
import { ProductService } from 'src/app/core/services/api-calls/product.service';

import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDetails: ProductModel;
  thumbsSwiper: any;
  isProcessing: boolean;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.fetchProductDetails(params['id'])
      }
    })
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Products', link: '/products' }, { label: 'Product Details', active: true }];
  }

  /**
   * Fetch product details
   * @param productId 
   */
  fetchProductDetails(productId) {
    this.isProcessing = true;
    this.productService.fetchProductDetails(productId, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.productDetails = result.results;
      }
    })
  }

  /**
   * Add to cart
   */
  addToCart(id) {
    this.cartService.addProductToCart(id)
  }
}
