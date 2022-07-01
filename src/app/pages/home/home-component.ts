import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerModel, CategoryModel, ProductModel } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/api-calls/cart.service';
import { ProductService } from 'src/app/core/services/api-calls/product.service';
import SwiperCore, { Autoplay, Pagination, Navigation, Swiper, } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    isProcessing = false;
    categories: CategoryModel[];
    page = 1;
    listArrayOfProducts: ProductModel[] = [];
    displayedList: ProductModel[] = [];
    canLoadMore = true;
    isProcessingMore = false;
    displayBanners: BannerModel[] = [];
    
    constructor(
        private cartService: CartService,
        private router: Router,
        private productService: ProductService,
    ) { this.loadMoreData(null) }

    ngOnInit() {
        this.fetchProducts()
        this.productService.fetchBanners((error, result) => {
            if (result !== null) {
                this.displayBanners = result.results;
            }
        })
    }

    /**
     * Fetch products
     */
    fetchProducts() {
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
     * View product details
     * @param product 
     */
    productDetails(product) {
        this.router.navigate(['/product-details', product.name, product.id])
    }
  /**
   * Add to cart
   */
   addToCart(id) {
    this.cartService.addProductToCart(id)
  }

    /**
     * Load more product 
     * @param ev 
     * @returns 
     */
    async loadMoreData(ev: any) {

        if (ev == null) {
            this.page = 1;
            return;
        } else {
            this.page++;
            if (this.canLoadMore) {
                this.isProcessingMore = true;
                this.productService.fetchProducts(this.page, async (error, result) => {
                    this.isProcessingMore = false;
                    if (result !== null && result !== undefined) {
                        const products = result.results;
                        this.listArrayOfProducts = this.listArrayOfProducts.concat(products);
                        this.displayedList = [...this.listArrayOfProducts];
                    } else {
                        this.canLoadMore = false;
                    }
                })
            }
        }
    }
}