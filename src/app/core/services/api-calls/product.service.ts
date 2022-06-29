import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICallback } from '../../classes/callback.interface';
import { ResponseStatus } from '../../enums/enums';
import { ConstantValueService } from '../helpers/constant-values.service';
import { DataProviderService } from '../helpers/data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private toast: ToastrService,
    private constantValues: ConstantValueService,
    private dataProvider: DataProviderService,
  ) { }
  /**
  * Get All active banners from server
  * @callback ICallback function that returns an error or result
  */
  fetchBanners(callback: ICallback) {
    this.dataProvider.getDataNoToken(this.constantValues.FETCH_SITE_BAANERS_ENDPOINT).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
  * Get All Categories from server
  * @param page Page number
  * @callback ICallback function that returns an error or result
  */
  fetchCategories(callback: ICallback) {
    this.dataProvider.getDataNoToken(this.constantValues.FETCH_CATEGORIES_ENDPOINT).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
  * Get a single product from server
  * @param id ID of product to fetch
  * @callback ICallback function that returns an error or result
  */
  fetchCategoryDetails(id, callback: ICallback) {
    this.dataProvider.getDataNoToken(this.constantValues.CATEGORY_DETAILS_ENDPOINT + id + '/').subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }

  /**
  * Get All products from server with page number
  * @param page Page number
  * @callback ICallback function that returns an error or result
  */
  fetchProducts(page: number, callback: ICallback) {
    this.dataProvider.getDataNoToken(this.constantValues.FETCH_PRODUCTS_ENDPOINT + '?page=' + page).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
* Search products from server
* @param search_phrase Search Text
* @callback ICallback function that returns an error or result
*/
  searchProducts(search_phrase, callback: ICallback) {
    this.dataProvider.postNoToken(this.constantValues.SEARCH_PRODUCTS_ENDPOINT, search_phrase).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
  * Get a single product from server
  * @param id ID of product to fetch
  * @callback ICallback function that returns an error or result
  */
  fetchProductDetails(id, callback: ICallback) {
    this.dataProvider.getDataNoToken(this.constantValues.PRODUCT_DETAILS_ENDPOINT + id + '/').subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }

  /**
  * Get All products from server with category name, sorting 
  * @param payload payload to submit to server
  * @callback ICallback function that returns an error or result
  */
  filterProducts(data, callback: ICallback) {
    this.dataProvider.postNoToken(this.constantValues.FILTER_PRODUCT_ENDPOINT, data).subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }
  /**
  * fetch related products from server
  * @id id of product to fetch its related products
  * @callback ICallback function that returns an error or result
  */
  fetchRelatedProducts(id, callback: ICallback) {
    this.dataProvider.getDataNoToken(this.constantValues.RELATED_PRODUCT_ENDPOINT + id + '/').subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }

  /**
  * Get a single product from server
  * @param id ID of product to fetch reviews
  * @callback ICallback function that returns an error or result
  */
  fetchProductReviews(id, callback: ICallback) {
    this.dataProvider.getDataNoToken(this.constantValues.FETCH_PRODUCT_REVIEWS_ENDPOINT + id + '/').subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      //   this.notificationService.snackBarErrorMessage(error.message);
    });
  }

  /**
  * Submit new review to server
  * @data data to submit to server
  * @callback ICallback function that returns an error or result
  */
   createProductReview(data, callback: ICallback) {
    this.dataProvider.postData(this.constantValues.CREATE_REVIEW_ENDPOINT, data).subscribe(result => {
      callback(null, result);
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success(result.message, '');
      }
    }, error => {
      callback(error, null);
      this.toast.error(error.message, '')
    });
  }

  /**
  * Submit reply existing review to server
  * @data data to submit to server
  * @callback ICallback function that returns an error or result
  */
  replyReview(data, callback: ICallback) {
    this.dataProvider.postData(this.constantValues.REPLY_REVIEW_ENDPOINT, data).subscribe(result => {
      callback(null, result);
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success(result.message, '');
      }
    }, error => {
      callback(error, null);
      this.toast.error(error.message, '')
    });
  }

  /**
  * Submit like or dislike review to server
  * @data data to submit to server
  * @callback ICallback function that returns an error or result
  */
  likeOrDislikeReview(data, callback: ICallback) {
    this.dataProvider.postData(this.constantValues.LIKE_OR_DISLIKE_REVIEW, data).subscribe(result => {
      callback(null, result);
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.toast.success(result.message, '');
      }
    }, error => {
      callback(error, null);
      this.toast.error(error.message, '')
    });
  }

}