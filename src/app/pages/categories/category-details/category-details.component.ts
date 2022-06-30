import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { ProductModel } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/api-calls/cart.service';
import { ProductService } from 'src/app/core/services/api-calls/product.service';

@Component({
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  catTitle;
  products: ProductModel [];
  isProcessing: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Home', link: '/' }, { label: 'Categories', link: '/categories' }, { label: 'Categories Details', active: true }];
    this.route.params.subscribe((params: Params) => {
      this.catTitle = params['catName'];
      if (params['id']) {
        this.fetchCategoryProducts(params['id'])
      }
    })
  }
  fetchCategoryProducts(cat) {
    this.isProcessing = true;
    this.productService.fetchCategoryDetails(cat, (error, result) =>{
      console.log(result)
      this.isProcessing = false;
      if(result !== null && result.response === ResponseStatus.SUCCESSFUL){
        this.products = result.results.products;
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

}
