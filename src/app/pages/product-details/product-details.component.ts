import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { ProductModel } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/api-calls/cart.service';
import { ProductService } from 'src/app/core/services/api-calls/product.service';
import { UserService } from 'src/app/core/services/api-calls/user.service';
import { WriteOrReplyReviewComponent } from './write-reply-review/write-reply-review.component';

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
  isSavingItem: boolean;
  page = 1;
  listArrayOfProducts: ProductModel[] = [];
  displayedList: ProductModel[] = [];
  productId: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.productId = params['id'];
        this.fetchProductDetails()
      }
    })
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Products', link: '/products' }, { label: 'Product Details', active: true }];
    this.fetchRelatedProducts()
  }
  /**
     * View product details
     * @param product 
     */
  viewProductDetails(product) {
    this.router.navigate(['/product-details', product.name, product.id])
  }
  /**
   * Fetch related products
   */
  fetchRelatedProducts() {
    this.isProcessing = true;
    this.productService.fetchProducts(this.page, (error, result) => {
      this.isProcessing = false;
      if (result !== null) {
        this.listArrayOfProducts = result.results;
        this.displayedList = [...this.listArrayOfProducts];
      }
    })
  }
  /**
   * Fetch product details
   * @param productId 
   */
  fetchProductDetails() {
    this.isProcessing = true;
    this.productService.fetchProductDetails(this.productId, (error, result) => {
      console.log(result)
      this.isProcessing = false;
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.productDetails = result.results;
      }
    })
  }
  saveNewItem() {
    this.isSavingItem = true;
    this.userService.saveItem({ product_id: this.productDetails.id }, (error, result) => {
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {

      }
    })
  }
  /**
   * Add to cart
   */
  addToCart(id) {
    this.cartService.addProductToCart(id)
  }

  writeOrReplyReview(reviewOrProdId, isReply) {
    this.dialog.open(WriteOrReplyReviewComponent, { data: { reviewData: reviewOrProdId, isReply: isReply } })
      .afterClosed().subscribe((isSuccess: boolean) => {
        if (isSuccess) {
          this.fetchProductDetails()
        }
      });
  }
}
