import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  templateUrl: './category-products.component.html',
})
export class CategoryProductsComponent implements OnInit {
  mainPageTitle = 'Category Details'
  pageTitle = ''
  constructor(
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const cat = params['catName'];
      if (cat) {
        this.fetchCategoryProducts(cat)
      }
    })
  }
  fetchCategoryProducts(cat) {

  }

  /**
 * View product details
 * @param product 
 */
  productDetails(product) {
    this.router.navigate(['/product-details', 'New Orange Flavor', 555454])
    // this.router.navigate(['/product-details', product.name, product.id])
  }
}
