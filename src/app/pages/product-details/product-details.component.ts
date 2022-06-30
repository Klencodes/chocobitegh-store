import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { ProductModel, ReviewModel } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/api-calls/cart.service';
import { ProductService } from 'src/app/core/services/api-calls/product.service';
import { UserService } from 'src/app/core/services/api-calls/user.service';
import { WriteOrReplyReviewComponent } from './write-reply-review/write-reply-review.component';

import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { ToastrService } from 'ngx-toastr';
import { LocalAuthService } from 'src/app/core/services/helpers/local-auth.service';
import { UserModel } from 'src/app/core/models/user';
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
  relatedProducts: ProductModel[] = [];
  productId: any;
  user: UserModel;
  canCheckout = false;
  reviewsDisplayed: ReviewModel[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private toast: ToastrService,
    private localAuth: LocalAuthService,
  ) { this.user = this.localAuth.userObj }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.productId = params['id'];
        this.fetchProductDetails();
        this.productReviews()
      }
    })
    //Set breadcrub titles
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Products', link: '/products' }, { label: 'Product Details', active: true }];

    //Check if cart item is greater than 0 to enable checkout button
    this.cartService.cartDataObs$.subscribe(result => {
      if (result.data.length > 0 && result.data[0].product !== undefined) {
        this.canCheckout = true;
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
   * Fetch product details
   * @param productId 
   */
  fetchProductDetails() {
    this.isProcessing = true;
    this.productService.fetchProductDetails(this.productId, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.productDetails = result.results;
      }
    })
  }
  /**
   * Saved product to favorite list
   */
  saveNewItem() {
    this.isSavingItem = true;
    this.userService.saveItem({ product_id: this.productDetails.id }, (error, result) => {
      this.isSavingItem = false;
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
  /**
   * Write or Reply review
   * @param reviewOrProdId 
   * @param isReply 
   * @returns 
   */
  writeOrReplyReview(reviewOrProdId, isReply) {
    //check if the user has logged in
    if (!this.user.auth_token) {
      this.toast.error('Please sign in to add your review');
      return;
    }
    this.dialog.open(WriteOrReplyReviewComponent, { data: { reviewData: reviewOrProdId, isReply: isReply } })
      .afterClosed().subscribe((isSuccess: boolean) => {
        if (isSuccess) {
          this.fetchProductDetails();
          this.productReviews();

        }
      });
  }
  likeOrDislikeReview(reviewId, isLike) {
    //check if the user has logged in
    if (!this.user.auth_token) {
      this.toast.error('Please sign in to like review');
      return;
    }
    this.productService.likeOrDislikeReview({ review_id: reviewId, is_like: isLike }, (error, result) => {
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.productReviews();
      }
    })
  }
  /**
   * Fetch current product reviews
   */
  productReviews() {
    this.productService.fetchProductReviews({ product_id: this.productId }, (error, result) => {
      if (result !== null) {
        this.reviewsDisplayed = result.results;

      }

    })

  }
}
